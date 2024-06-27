import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PetsService } from 'src/pets/pets.service';
import { UsersService } from 'src/users/users.service';
import { IDataloaders } from './dataloader.interface';
import { User } from 'src/users/user.entity';
import { Pet } from 'src/pets/entities/pet.entity';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly usersService: UsersService,
    private readonly petsService: PetsService,
  ) {}

  getLoaders(): IDataloaders {
    const usersLoader = this._createUsersLoader();
    const petsLoader = this._createPetsLoader();
    return {
      usersLoader,
      petsLoader,
    };
  }

  private _createUsersLoader() {
    return new DataLoader<string, User>(
      async (keys: string[]) => await this.usersService.getUsersByBatch(keys),
    );
  }

  private _createPetsLoader() {
    return new DataLoader<string, Pet[]>(
      async (keys: string[]) => await this.petsService.getPetsByBatch(keys),
    );
  }
}
