import { Service } from "typedi";
import DefaultInformations from "../models/DefaultInformations";

@Service()
export class DefaultInformationsTypegooseRepository {
    get() {
        return DefaultInformations.findOne()
    }
}