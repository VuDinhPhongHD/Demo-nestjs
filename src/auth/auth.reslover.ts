import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginResponse, LoginUserInput } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver(() => LoginResponse)
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    async login(@Context() context, @Context() { res }: { res: Response }, @Context() { req }: { req: Request }) {
        const refreshToken = req.cookies['refresh_token'];
        console.log("refres", refreshToken)
        return this.authService.login(context.user, res);
    }

    @Mutation(() => LoginResponse)
    async refresherToken(@Context() { res }: { res: Response }, @Context() { req }: { req: Request }) {
        const refreshToken = req.cookies['refresh_token'];
        console.log("refres", refreshToken)
        return this.authService.processNewToken(refreshToken, res);
    }
}
