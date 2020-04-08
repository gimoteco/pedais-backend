import { Group } from "./Group";

export interface GroupRepository {
    getAllGroups(): Promise<Group[]>;
    addGroup(name: string): Promise<Group>;
    removeGroup(id: string): Promise<void>;
    getById(id: string): Promise<Group>;
    disableGroup(id: string): Promise<void>;

}
