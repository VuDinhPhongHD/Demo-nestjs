import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserInput } from 'src/graphql';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signIn(input: SignInUserInput) {
        const user = await this.usersService.findOne(input.email);
        if (user?.password !== input.password) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
    }
}
