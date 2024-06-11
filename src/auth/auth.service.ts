import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserInput } from 'src/graphql';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const isValidPassword = await this.usersService.isValidPassword(password, user.password);
        if (user && isValidPassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }


    async login(loginUserInput: LoginUserInput) {
        const user = await this.usersService.findOne(loginUserInput.email);
        const isValidPassword = await this.usersService.isValidPassword(loginUserInput.password, user.password);
        if (user && isValidPassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}