import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/enums/role.enum';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
    async getUsers(role: Role): Promise<User[]> {
        if (role == "") {
            return await this.userRepository.find();
        }
        return await this.userRepository.findBy({ role })
    }

    async getUser(id: number): Promise<User> {
        console.log(`Fetching user with ID: ${id}`);
        return await this.userRepository.findOneBy({ id });
    }
}
