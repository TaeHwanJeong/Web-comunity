/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){};

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id')id: string): string {
        return `This action returns a #${id} user`;
    }

    @Post()
    create(@Body() user: User){
        return this.userService.create(user);
    }

    @Put(':id')
    update(@Param('id')id: number, @Body() user: User){
        this.userService.update(id, user);
        return `This action updates a #${id} user`;
    }

    @Delete(':id')
    remove(@Param('id')id: number){
        this.userService.remove(id);
        return `This action removes a #${id} user`;
    }
}