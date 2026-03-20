import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AuthBodyDto } from 'src/auth/authBodyDto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async login(authBody: AuthBodyDto) {
        const { username, password } = authBody;
        const existingUser = await this.usersService.getUser(username);
        if (!existingUser) throw new NotFoundException(`User with username ${username} not found`);
        const isPasswordValid = await this.isPasswordValid(password, existingUser.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }
        return this.authenticateUser({ userId: existingUser.userId });
        
    }

    async getProfile(userName: string) {
        const user = await this.usersService.getUser(userName);
        if (!user) throw new NotFoundException(`User with username ${userName} not found`);
        return {username: user.username, userId: user.userId};
    }

    private async isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }

    private async authenticateUser({userId} : {userId: string}) {
        const payload = { userId };
        // eslint-disable-next-line @typescript-eslint/await-thenable
        return { access_token : await this.jwtService.sign(payload) }
    }
}
