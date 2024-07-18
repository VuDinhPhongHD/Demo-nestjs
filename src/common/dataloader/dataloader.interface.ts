import DataLoader from 'dataloader';
import { Pet } from 'src/pets/entities/pet.entity';
import { User } from 'src/users/user.entity';
export interface IDataloaders {
  usersLoader: DataLoader<string, User>;
  petsLoader: DataLoader<string, Pet[]>;
}
