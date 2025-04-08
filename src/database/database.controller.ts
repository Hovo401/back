import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('db')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @Roles(Role.Admin)
  getUsers(){
    return this.databaseService.getUsers();
  }
  
  @Post()
  @Roles(Role.Admin)
  createUser(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string){
    return this.databaseService.createUser(name, email, password);
  } 

  @Delete(':id')
  @Roles(Role.Admin)
  deleteUser(@Param('id') id: number){
    return this.databaseService.deleteUser(Number(id));
  }

  @Put(':id')
  @Roles(Role.Admin)
  updateUser(@Param('id') id: number, @Body('name') name: string, @Body('email') email: string, @Body('password') password: string){
    return this.databaseService.updateUser(Number(id), name, email, password);
  }
}
 