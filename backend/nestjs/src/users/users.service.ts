import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';

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


    async createUser(user: User) : Promise<string> {
        try {
            await this.userRepository.save(user);
            return `l'utilisateur ${user.username} a été créé avec succès`;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create user');
        }
    }
}
