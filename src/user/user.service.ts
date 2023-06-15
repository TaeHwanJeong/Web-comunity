/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}
    
      findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
      }

      async create(user: User): Promise<void> {
        await this.usersRepository.save(user);
      }
    
      async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }

      async update(id: number, user: User): Promise<void> {
        const existUser = await this.usersRepository.findOne(id);
        if(existUser){
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ 
                    name: user.name, 
                    age: user.age,
                    breed: user.breed
                })
                .where("id = :id", { id })
                .execute();
        }
      }
}
