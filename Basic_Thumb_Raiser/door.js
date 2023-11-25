// door.js
import * as THREE from "three";
import TWEEN from "three/addons/libs/tween.module.js"
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

export default class Door {
    constructor(parameters) {
        const frameSize = parameters.frameSize || { width: 0.840, height: 1.788, depth: 0.045 };
        const doorSize = parameters.doorSize || { width: 0.654, height: 1.686, depth: 0.035, gap: 0.0465 };

        // Create a material
        const sideMaterial = new THREE.MeshBasicMaterial({ color: 0xc36e2d });

        // Create the frame
        let geometry = new THREE.BoxGeometry(frameSize.width, frameSize.height, frameSize.depth);

        // Create a texture
        let texture = new THREE.TextureLoader().load("./textures/door/frame_front.png");
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create a material
        let frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
        frontMaterial.transparent = true;

        // Create a texture
        texture = new THREE.TextureLoader().load("./textures/door/frame_back.png");
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create a material
        let backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
        backMaterial.transparent = true;

        // Create a mesh with the specified geometry and materials
        this.frame = new THREE.Mesh(geometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, frontMaterial, backMaterial]);

        // Create the door
        geometry = new THREE.BoxGeometry(doorSize.width, doorSize.height, doorSize.depth);

        // Create a texture
        texture = new THREE.TextureLoader().load("./textures/door/door_front.png");
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create a material
        frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });

        // Create a texture
        texture = new THREE.TextureLoader().load("./textures/door/door_back.png");
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create a material
        backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });

        // Create a mesh with the specified geometry and materials
        this.doorMesh = new THREE.Mesh(geometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, frontMaterial, backMaterial]);
        this.doorMesh.translateX(doorSize.width / 2.0);
        this.doorMesh.translateY(-doorSize.gap);

        // Create a group
        this.doorGroup = new THREE.Group();

        // Add the frame and door mesh to the group
        this.doorGroup.add(this.frame);
        this.doorGroup.add(this.doorMesh);
        this.doorGroup.translateX(-doorSize.width / 2.0);

        // Set up the door animation
        this.doorState = "close";
        this.tween = new TWEEN.Tween(this.doorGroup.rotation);

        // Create and configure the GUI for testing
        this.gui = new GUI();
        const actions = {
            open: () => this.openDoor(),
            stop: () => this.stopDoor(),
            close: () => this.closeDoor()
        };
        this.gui.add(actions, "open");
        this.gui.add(actions, "stop");
        this.gui.add(actions, "close");
    }

    openDoor() {
        if (this.doorState !== "open") {
            this.doorState = "open";
            this.tween.stop();
            this.tween.to({ y: Math.PI / 2.0 }, 2000 * (1.0 - this.doorGroup.rotation.y / (Math.PI / 2.0)));
            this.tween.startFromCurrentValues();
        }
    }

    stopDoor() {
        this.doorState = "stop";
        this.tween.stop();
    }

    closeDoor() {
        if (this.doorState !== "close") {
            this.doorState = "close";
            this.tween.stop();
            this.tween.to({ y: 0.0 }, 2000 * this.doorGroup.rotation.y / (Math.PI / 2.0));
            this.tween.startFromCurrentValues();
        }
    }

    getObject() {
        return this.doorGroup;
    }
}
