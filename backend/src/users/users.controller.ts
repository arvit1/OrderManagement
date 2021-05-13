import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {ListUserDto} from './dto/list-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UsersService} from './users.service';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from '../auth/guards/role.guard';
import {Roles} from '../auth/roles.decorator';

@Controller('api/users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    @Roles('ROOTLESS')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    create(@Body() createUserDto: CreateUserDto) {
        const user = {
            email: createUserDto.email,
            username: createUserDto.username,
            password: createUserDto.password,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            createAt: new Date(),
            updateAt: new Date(),
        };

        this.usersService.create(user);
        return user;
    }

    @Get()
    @Roles('ROOTLESS')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    findAll(@Query() query: ListUserDto) {
        /**
         * IMPLEMENTARE LE WHERE NELLA FIND
         */
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    findOne(@Param('id') id: number) {

      /**
       * IMPLEMENTARE FIND
       */
      return this.usersService.findOne(id);
    }

    @Put(':id')
    @Roles('ROOTLESS')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

      /**
       * IMPLEMENTARE UPDATE
       */
      return `This action updates a #${id} user`;
    }

    @Delete(':id')
    @Roles('ROOTLESS')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    remove(@Param('id') id: string) {

      /**
       * IMPLEMENTARE DELETE
       */
      return `This action removes a #${id} user`;
    }

}
