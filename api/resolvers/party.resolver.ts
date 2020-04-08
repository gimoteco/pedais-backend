import { Query, Resolver, Mutation, Arg, FieldResolver, Root, Ctx } from "type-graphql";
import { Inject, Service } from "typedi";
import { PartyTypegooseRepository } from "../../infrastructure/databaseRepositories/partyRepository";
import { AddPartyInput } from "./types/PartyInput";
import { Party } from "./types/Party";
import { GroupTypegooseRepository } from "../../infrastructure/databaseRepositories/groupRepository";
import { BucketManager } from "../../infrastructure/aws/bucketManager";

@Service()
@Resolver(of => Party)
export class PartyResolver {
    @Inject() private partyRepository: PartyTypegooseRepository;
    @Inject() private groupRepository: GroupTypegooseRepository;
    @Inject() private bucketManager: BucketManager;

    @Query(_ => [Party])
    async parties() {
        return await this.partyRepository.getAll()
    }

    @Query(_ => Party)
    async party(@Arg("id") id: string) {
        return await this.partyRepository.getById(id)
    }

    @Mutation(_ => Party)
    async createParty(@Arg("input") input: AddPartyInput) {
        return this.partyRepository.create(input)
    }

    @Mutation(_ => Boolean)
    async markAsInterested(@Arg("id") id: string, @Ctx() { user }) {
        const party = await this.partyRepository.getById(id)
        party.addInterested(user)
        await party.save()
        return true
    }

    @FieldResolver()
    async group(@Root() party: Party) {
        return await this.groupRepository.getById(party._doc.group)
    }

    @FieldResolver()
    coverImageUrl(@Root() party: Party) {
        console.log(party)
        return party._doc.coverImage ? this.bucketManager.getObjectUrl(party._doc.coverImage) : party.name
    }
}