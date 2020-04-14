import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { BucketManager } from "../../infrastructure/aws/bucketManager";
import { GroupTypegooseRepository } from "../../infrastructure/databaseRepositories/groupRepository";
import { PartyTypegooseRepository } from "../../infrastructure/databaseRepositories/partyRepository";
import { UserTypegooseRepository } from "../../infrastructure/databaseRepositories/userRepository";
import { Party } from "./types/Party";
import { AddPartyInput } from "./types/PartyInput";

@Service()
@Resolver(of => Party)
export class PartyResolver {
    @Inject() private partyRepository: PartyTypegooseRepository;
    @Inject() private groupRepository: GroupTypegooseRepository;
    @Inject() private userRepository: UserTypegooseRepository;
    @Inject() private bucketManager: BucketManager;

    @Query(_ => [Party])
    async parties() {
        return await this.partyRepository.getAll()
    }

    @Query(_ => Party)
    async party(@Arg("id") id: string) {
        return await this.partyRepository.getById(id)
    }

    @Authorized()
    @Mutation(_ => Party)
    async createParty(@Arg("input") input: AddPartyInput, @Ctx() { user: creator }) {
        return this.partyRepository.create(input, creator)
    }

    @Authorized()
    @Mutation(_ => Boolean)
    async toggleInterest(@Arg("id") id: string, @Ctx() { user }) {
        const party = await this.partyRepository.getById(id)
        party.toggleInterest(user)
        await party.save()
        return true
    }

    @FieldResolver()
    async group(@Root() party: Party) {
        return await this.groupRepository.getById(party._doc.group)
    }

    @FieldResolver()
    async creator(@Root() party: Party) {
        return await this.userRepository.getById(party._doc.creator)
    }

    @FieldResolver()
    coverImageUrl(@Root() party: Party) {
        return party._doc.coverImage ? this.bucketManager.getObjectUrl(party._doc.coverImage) : null
    }
}