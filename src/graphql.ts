
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreatePetInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
    species?: Nullable<string>;
    userId?: Nullable<string>;
}

export class FindPetInput {
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
    search?: Nullable<string>;
    filterAge?: Nullable<number>;
    filterSpecies?: Nullable<string>;
    skip?: Nullable<number>;
    take?: Nullable<number>;
}

export class CreateUserInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
    email?: Nullable<string>;
}

export abstract class IMutation {
    abstract createPet(input?: Nullable<CreatePetInput>): Nullable<PetOutput> | Promise<Nullable<PetOutput>>;

    abstract createUser(input?: Nullable<CreateUserInput>): Nullable<UserOutput> | Promise<Nullable<UserOutput>>;
}

export abstract class IQuery {
    abstract findAll(input?: Nullable<FindPetInput>): Nullable<Nullable<PetOutput>[]> | Promise<Nullable<Nullable<PetOutput>[]>>;

    abstract queryPetById(petId?: Nullable<string>): Nullable<PetOutputWithUser> | Promise<Nullable<PetOutputWithUser>>;
}

export class PetOutput {
    id: string;
    age?: Nullable<number>;
    name?: Nullable<string>;
    species?: Nullable<string>;
    userId?: Nullable<string>;
}

export class PetOutputWithUser {
    id: string;
    age?: Nullable<number>;
    name?: Nullable<string>;
    species?: Nullable<string>;
    user?: Nullable<UserOutput>;
}

export class UserOutput {
    id: string;
    age?: Nullable<number>;
    name?: Nullable<string>;
    email?: Nullable<string>;
}

type Nullable<T> = T | null;
