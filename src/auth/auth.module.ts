import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { AuthResolver } from './user.reslover';

@Module({
  imports: [UserModule],
  providers: [AuthService, AuthResolver]
})
export class AuthModule { }
