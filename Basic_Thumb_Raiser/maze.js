import * as THREE from "three";
import * as TWEEN from "three/addons/libs/tween.module.js";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Door from "./door.js";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
    constructor(parameters) {
        this.onLoad = function (description) {
            // Store the maze's map and size
            this.map = description.map;
            this.size = description.size;
            this.rooms = description.rooms;
            this.lift = description.lift;
            this.passages = description.passages;

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.initialPosition);
            this.initialDirection = description.initialDirection;

            // Create a group of objects
            this.object = new THREE.Group();

            // Create the ground
            this.ground = new Ground({ textureUrl: './textures/ground.jpg', size: description.size });
            this.object.add(this.ground.object);

            // Create a wall
            this.wall = new Wall({ textureUrl: './textures/wall.jpg' });
            const doors = [];
            this.door = new Door();
            this.elevator = new Wall({ textureUrl: './textures/elevator.jpg' });
            this.passage = new Wall({ textureUrl: './textures/passage.jpg' });

            // Build the maze
            let wallObject;
            for (let i = 0; i <= description.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                for (let j = 0; j <= description.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                    /*
                     * description.map[][] | North wall | West wall
                     * --------------------+------------+-----------
                     *          0          |     No     |     No            20,21,22,23,24,25,26,27,28
                     *          1          |     No     |    Yes            30,31,32,33,34,35,36,37,38
                     *          2          |    Yes     |     No            40,41,42,43,44,45,46,47,48
                     *          3          |    Yes     |    Yes            50,51,52,53,54,55,56,57,58
                     * 
                     * description.map[][] | North door | West door
                     * --------------------+------------+-----------
                     *          4          |     No     |    Yes
                     *          5          |    Yes     |     No
                     *
                     * description.map[][] | North elevator | West elevator
                     * --------------------+----------------+--------------
                     *          6          |     No         |    Yes
                     *          7          |    Yes         |     No
                     * 
                     * description.map[][] | North passage | West passage
                     * --------------------+---------------+-------------
                     *       8,9,10        |     No        |    Yes     IN ARRAY PASSAGES +1 next passage
                     *      11,12,13       |    Yes        |     No
                     */
                    //wall
                    if ([2, 3, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 58].includes(description.map[j][i])) {
                        wallObject = this.wall.object.clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    if ([1, 3, 30, 31, 32, 33, 34, 35, 36, 37, 38, 50, 51, 52, 53, 54, 55, 56, 57, 58].includes(description.map[j][i])) {
                        wallObject = this.wall.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }

                    //door
                    if (description.map[j][i] == 5) {
                        wallObject = this.door.getObject().clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                        doors.push(wallObject);
                    }
                    if (description.map[j][i] == 4) {
                        wallObject = this.door.getObject().clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                        doors.push(wallObject);
                    }

                    //elevator
                    if (description.map[j][i] == 7) {
                        wallObject = this.elevator.object.clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    if (description.map[j][i] == 6) {
                        wallObject = this.elevator.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }

                    //passage
                    if (description.map[j][i] == 11 || description.map[j][i] == 12 || description.map[j][i] == 13) {
                        wallObject = this.passage.object.clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    if (description.map[j][i] == 8 || description.map[j][i] == 9 || description.map[j][i] == 10) {
                        wallObject = this.passage.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }
                }
            }

            this.doors = doors;
            this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.loaded = true;
        }

        this.onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        this.onError = function (url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }
        this.loaded = false;

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => this.onProgress(this.url, xhr),

            // onError callback
            error => this.onError(this.url, error)
        );
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.size.width / 2.0 + 0.5) * this.scale.x, 0.0, (position[0] - this.size.height / 2.0 + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.height / 2.0), Math.floor(position.x / this.scale.x + this.size.width / 2.0)];
    }


    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);

        if ([1, 3, 4, 30, 31, 32, 33, 34, 35, 36, 37, 38, 50, 51, 52, 53, 54, 55, 56, 57, 58].includes(this.map[indices[0]][indices[1]])) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if ([1, 3, 4, 30, 31, 32, 33, 34, 35, 36, 37, 38, 50, 51, 52, 53, 54, 55, 56, 57, 58].includes(this.map[indices[0]][indices[1]])) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if ([2, 3, 5, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 58].includes(this.map[indices[0]][indices[1]])) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if ([2, 3, 5, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 58].includes(this.map[indices[0]][indices[1]])) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    distanceToWestDoor(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 4) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastDoor(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 4) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthDoor(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 5) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthDoor(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 5) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    checkDoorCollisions(playerPosition, playerRadius) {
        this.doors.forEach(child => {
            if (this.collisionDoor(playerPosition, playerRadius)) {
                this.openDoor(child);
            }
        });
    }

    openDoor(child) {
        let tween = new TWEEN.Tween(child.rotation)
        tween.to({ y: Math.PI / 2.0 }, 2000 * (1.0 - child.rotation.y / (Math.PI / 2.0)));
        tween.startFromCurrentValues();
    }

    collisionDoor(position, playerRadius) {
        return this.distanceToEastDoor(position) < playerRadius || this.distanceToWestDoor(position) < playerRadius || this.distanceToNorthDoor(position) < playerRadius || this.distanceToSouthDoor(position) < playerRadius;
    }

    collisionPassage(position, playerRadius) {
        return this.distanceToEastPassage(position) < playerRadius || this.distanceToWestPassage(position) < playerRadius || this.distanceToNorthPassage(position) < playerRadius || this.distanceToSouthPassage(position) < playerRadius;
    }

    collisionLift(position, playerRadius) {
        return this.distanceToEastLift(position) < playerRadius || this.distanceToWestLift(position) < playerRadius || this.distanceToNorthLift(position) < playerRadius || this.distanceToSouthLift(position) < playerRadius;
    }

    distanceToWestPassage(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 8 || this.map[indices[0]][indices[1]] == 9 || this.map[indices[0]][indices[1]] == 10) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastPassage(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 8 || this.map[indices[0]][indices[1]] == 9 || this.map[indices[0]][indices[1]] == 10) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthPassage(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 11 || this.map[indices[0]][indices[1]] == 12 || this.map[indices[0]][indices[1]] == 13) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthPassage(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 11 || this.map[indices[0]][indices[1]] == 12 || this.map[indices[0]][indices[1]] == 13) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    checkPassageCollisions(playerPosition, playerRadius) {
        if (this.collisionPassage(playerPosition, playerRadius)) {
            const indices = this.cartesianToCell(playerPosition);
            switch (this.map[indices[0]][indices[1]]) {
                case 8: case 11:
                    return this.passages[0];
                case 9: case 12:
                    return this.passages[1];
                case 10: case 13:
                    return this.passages[2];
                default:
                    return "";
            }
        }
        return "";
    }

    checkLiftCollision(playerPosition, playerRadius) {
        if (this.collisionLift(playerPosition, playerRadius)) {
            return this.lift;
        } else {
            return "";
        }
    }

    distanceToWestLift(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 6) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastLift(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 6) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthLift(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 7) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthLift(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 7) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    changeRoomName(position) {
        const a = document.getElementById("roomNames");
        const indices = this.cartesianToCell(position);
        console.log(this.map[indices[0]][indices[1]]);
        switch (this.map[indices[0]][indices[1]]) {
            case 20: case 30: case 40: case 50:
                a.textContent = this.rooms[0];
                break;
            case 21: case 31: case 41: case 51:
                a.textContent = this.rooms[1];
                break;
            case 22: case 32: case 42: case 52:
                a.textContent = this.rooms[2];
                break;
            case 23: case 33: case 43: case 53:
                a.textContent = this.rooms[3];
                break;
            case 24: case 34: case 44: case 54:
                a.textContent = this.rooms[4];
                break;
            case 25: case 35: case 45: case 55:
                a.textContent = this.rooms[5];
                break;
            case 26: case 36: case 46: case 56:
                a.textContent = this.rooms[6];
                break;
            case 27: case 37: case 47: case 57:
                a.textContent = this.rooms[7];
                break;
            case 28: case 38: case 48: case 58:
                a.textContent = this.rooms[8];
                break;
            default:
                a.textContent = "Hall";
        }
    }
}