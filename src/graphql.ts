
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

export abstract class IMutation {
    abstract createPet(input?: Nullable<CreatePetInput>): Nullable<PetOutput> | Promise<Nullable<PetOutput>>;
}

export abstract class IQuery {
    abstract findAll(input?: Nullable<FindPetInput>): Nullable<Nullable<PetOutput>[]> | Promise<Nullable<Nullable<PetOutput>[]>>;
}

export class PetOutput {
    id: string;
    age?: Nullable<number>;
    name?: Nullable<string>;
    species?: Nullable<string>;
}

type Nullable<T> = T | null;
