
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginUserInput {
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class CreatePetInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
    species?: Nullable<string>;
    userId?: Nullable<string>;
}

export class UpdatePetInput {
    id: string;
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
    password?: Nullable<string>;
}

export class UpdateUserInput {
    id: string;
    name?: Nullable<string>;
    age?: Nullable<number>;
    email?: Nullable<string>;
}

export class LoginResponse {
    id: string;
    age?: Nullable<number>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    access_token?: Nullable<string>;
}

export abstract class IMutation {
    abstract login(loginUserInput: LoginUserInput): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;

    abstract createPet(input?: Nullable<CreatePetInput>): Nullable<PetOutput> | Promise<Nullable<PetOutput>>;

    abstract updatePet(input?: Nullable<UpdatePetInput>): Nullable<PetOutput> | Promise<Nullable<PetOutput>>;

    abstract deletePet(petId?: Nullable<string>): Nullable<PetOutput> | Promise<Nullable<PetOutput>>;

    abstract destroyPet(petId?: Nullable<string>): Nullable<PetOutput> | Promise<Nullable<PetOutput>>;

    abstract createUser(input?: Nullable<CreateUserInput>): Nullable<UserOutput> | Promise<Nullable<UserOutput>>;

    abstract updateUser(input?: Nullable<UpdateUserInput>): Nullable<UserOutput> | Promise<Nullable<UserOutput>>;

    abstract deleteUser(userId?: Nullable<string>): Nullable<UserOutput> | Promise<Nullable<UserOutput>>;

    abstract destroyUser(userId?: Nullable<string>): Nullable<UserOutput> | Promise<Nullable<UserOutput>>;
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
    user?: Nullable<UserOutput>;
    deletedAt?: Nullable<string>;
}

export class PetOutputWithUser {
    id: string;
    age?: Nullable<number>;
    name?: Nullable<string>;
    species?: Nullable<string>;
    user?: Nullable<UserOutput>;
    deletedAt?: Nullable<string>;
}

export class UserOutput {
    id: string;
    age?: Nullable<number>;
    name?: Nullable<string>;
    email?: Nullable<string>;
}

type Nullable<T> = T | null;
