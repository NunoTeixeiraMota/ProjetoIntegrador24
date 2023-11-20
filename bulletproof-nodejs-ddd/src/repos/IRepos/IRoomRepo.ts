import { Repo } from "../../core/infra/Repo";
import { room } from "../../domain/room";

export default interface IRoomRepo extends Repo<room> {
    save(room: room): Promise<room>;
}