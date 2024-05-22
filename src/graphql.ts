
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

export abstract class IMutation {
    abstract createPet(input?: Nullable<CreatePetInput>): Nullable<PetInput> | Promise<Nullable<PetInput>>;
}

export abstract class IQuery {
    abstract findAll(sortBy?: Nullable<string>, sortOrder?: Nullable<string>, search?: Nullable<string>, filterAge?: Nullable<number>, filterSpecies?: Nullable<string>, skip?: Nullable<number>, take?: Nullable<number>): Nullable<Nullable<PetInput>[]> | Promise<Nullable<Nullable<PetInput>[]>>;
}

export class PetInput {
    id: string;
    age?: Nullable<number>;
    name?: Nullable<string>;
    species?: Nullable<string>;
}

type Nullable<T> = T | null;
