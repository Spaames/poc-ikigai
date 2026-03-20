import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectRepository(User) 
    private readonly userRepository: Repository<User>) {}

    async getUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            this.logger.error('Failed to get users', error);
            throw new InternalServerErrorException('Failed to get users');
        }
    }

    async getUser(userName: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { username: userName } });
            return user;
        } catch (error) {
            this.logger.error(`Failed to get user ${userName}`, error);
            throw new InternalServerErrorException('Failed to get user');
        }
    }

    async createUser(user: User): Promise<string> {
        const hashedPassword = await this.hashPassword(user.password);
        try {
            await this.userRepository.save({ ...user, password: hashedPassword });
            return `L'utilisateur ${user.username} a été créé avec succès`;
        } catch (error) {
            this.logger.error('Failed to create user', error);
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    private async hashPassword(password: string): Promise<string> {
        return await hash(password, 10);
    }
}