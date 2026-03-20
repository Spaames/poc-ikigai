import { Body, Controller, Post, Get, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyDto } from 'src/auth/authBodyDto';
import { AuthGuard } from './auth.guard';
import { PerformanceInterceptor } from 'src/common/interceptors/performance.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    @UseInterceptors(PerformanceInterceptor)
    async getAuth(@Body() authBody: AuthBodyDto) {
        const data = await this.authService.login(authBody);
        return data;
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(PerformanceInterceptor)
    @Get('profil')
    async getProfile(@Request() req) {
        return this.authService.getProfile(req.user.username);
    }

    
}
