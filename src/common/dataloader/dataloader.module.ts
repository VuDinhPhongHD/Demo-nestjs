import { UserModule } from 'src/users/user.module';
import { DataloaderService } from './dataloader.service';
import { PetsModule } from 'src/pets/pets.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, PetsModule],
  providers: [DataloaderService, DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
