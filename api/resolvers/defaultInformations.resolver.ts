import { Query, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"
import { DefaultInformationsTypegooseRepository } from "../../infrastructure/databaseRepositories/defaultInformationsRepository"
import { DefaultInformations } from "./types/DefaultInformations"

@Service()
@Resolver()
export class DefaultInformationsResolver {
    @Inject() defaultInformationsRepository: DefaultInformationsTypegooseRepository;

    @Query(_ => DefaultInformations, { nullable: true })
    defaultInformations() {
        return this.defaultInformationsRepository.get()
    }
}