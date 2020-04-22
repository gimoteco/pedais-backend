import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql"
import { Inject, Service } from "typedi"
import { BucketManager } from "../../infrastructure/aws/bucketManager"
import { GroupTypegooseRepository } from "../../infrastructure/databaseRepositories/groupRepository"
import { PartyTypegooseRepository } from "../../infrastructure/databaseRepositories/partyRepository"
import { UserTypegooseRepository } from "../../infrastructure/databaseRepositories/userRepository"
import { Party } from "./types/Party"
import { AddPartyInput } from "./types/PartyInput"

@Service()
@Resolver(() => Party)
export class PartyResolver {
    @Inject() private partyRepository: PartyTypegooseRepository;
    @Inject() private groupRepository: GroupTypegooseRepository;
    @Inject() private userRepository: UserTypegooseRepository;
    @Inject() private bucketManager: BucketManager;

    @Query(_ => [Party])
    async parties(@Arg("showPast", { nullable: true }) showPast: boolean) {
        if (showPast) return await this.partyRepository.getAll()

        return await this.partyRepository.getAllComingSoon()
    }

    @Authorized()
    @Query(_ => [Party], { nullable: true })
    async myParties(@Ctx() { user }) {
        return await this.partyRepository.getPartiesForUser(user)
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
    async interested(@Root() party: Party) {
        return await this.userRepository.getMany(party._doc.interested)
    }

    @FieldResolver()
    coverImageUrl(@Root() party: Party) {
        return party._doc.coverImage ? this.bucketManager.getObjectUrl(party._doc.coverImage) : null
    }
}