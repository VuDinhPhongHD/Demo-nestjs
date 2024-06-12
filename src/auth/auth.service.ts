import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { access } from 'fs';
import { LoginUserInput } from 'src/graphql';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Response } from 'express'; // Thêm import này

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService,
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

    createRefreshToken = (payload: any) => {
        const refresh_token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE")) / 1000,
        });
        return refresh_token;
    }
    async login(user: any) {
        const { id, name, email } = user;
        console.log("user", user);
        const payload = {
            sub: 'token login',
            iss: 'from server',
            id,
            name,
            email,
        };

        const refresh_token = this.createRefreshToken(payload);
        await this.usersService.updateUserRefreshToken(refresh_token, user.id);
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: refresh_token
        };
    }
    async processNewToken(refresh_token: string) {
        try {
            this.jwtService.verify(refresh_token, {
                secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            });
            const user = await this.usersService.findOneByRefreshToken(refresh_token);
            if (user) {
                const { id, name, email } = user;
                const payload = {
                    sub: "token login",
                    iss: "from server",
                    id,
                    name,
                    email,
                };
                const refresh_token = this.createRefreshToken(payload);
                await this.usersService.updateUserRefreshToken(refresh_token, user.id);
                return {
                    access_token: this.jwtService.sign(payload),
                    refresh_token: refresh_token,
                };
            } else {
                throw new BadRequestException("Invalid token! Please log in again.");
            }
        } catch (error) {
            throw new BadRequestException("Invalid token! Please log in again.");
        }
    }

}
