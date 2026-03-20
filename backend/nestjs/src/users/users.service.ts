import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) 
    private readonly userRepository: Repository<User>) {}

    async getUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            console.log(error);
            throw new Error('Failed to get users');
        }
    }

    async getUser(userName: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { username: userName } });
            if (!user) {
                throw new Error(`User with username ${userName} not found`);
            }
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to get user');
        }
    }


    async createUser(user: User) : Promise<string> {
        const hashedPassword = await this.hashPassword(user.password);
        try {
            await this.userRepository.save({ ...user, password: hashedPassword });
            return `l'utilisateur ${user.username} a été créé avec succès`;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create user');
        }
    }



    private async hashPassword(password: string): Promise<string> {
        const hashedPassword = await hash(password, 9);
        return hashedPassword;
    }
}
