import { Party } from "./Party";

export interface PartyRepository {
    getAll(): Promise<Party[]>;
    getById(id: string): Promise<Party>;
    create(input, creator): Promise<Party>;
}
