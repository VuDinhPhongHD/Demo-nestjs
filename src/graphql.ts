
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreatePetInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
    species?: Nullable<string>;
}

export interface IMutation {
    createPet(input?: Nullable<CreatePetInput>): Nullable<Pet> | Promise<Nullable<Pet>>;
}

export interface IQuery {
    findAll(sortBy?: Nullable<string>, sortOrder?: Nullable<string>, search?: Nullable<string>, filterAge?: Nullable<number>, filterSpecies?: Nullable<string>, skip?: Nullable<number>, take?: Nullable<number>): Nullable<Nullable<Pet>[]> | Promise<Nullable<Nullable<Pet>[]>>;
}

export interface Pet {
    id: string;
    age?: Nullable<number>;
    name?: Nullable<string>;
    species?: Nullable<string>;
}

type Nullable<T> = T | null;
