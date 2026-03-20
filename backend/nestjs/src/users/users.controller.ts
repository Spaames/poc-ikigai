import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UsersInterceptor } from '../common/interceptors/users.interceptor';
import { PerformanceInterceptor } from 'src/common/interceptors/performance.interceptor';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseInterceptors(UsersInterceptor, PerformanceInterceptor)
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers();
    }

    @Post('register')
    @UseInterceptors(PerformanceInterceptor)
    async createUser(@Body() user: User) {
        return await this.usersService.createUser(user);
    }


}
