import { Injectable, UnauthorizedException } from '@nestjs/common';
import { access } from 'fs';
import { LoginUserInput } from 'src/graphql';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const isValidPassword = await this.usersService.isValidPassword(password, user.password);
        if (user && isValidPassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }


    async login(user: User) {
        const payload = { username: user.name, sub: user.id };
        return {
            id: user.id,
            age: user.age,
            name: user.name,
            email: user.email,
            access_token: this.jwtService.sign(payload)
        };
    }
}