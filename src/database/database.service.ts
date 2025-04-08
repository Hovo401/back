// src/database/database.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatabaseService {
  constructor(private prisma: PrismaService) {}
  
  getUsers() {
    return this.prisma.user.findMany();
  }

  createUser(name: string, email: string, password: string) {
    return this.prisma.user.create({data:{
      name, email, password
    }});
  }

  updateUser(id: number, name: string, email: string, password: string){
    return this.prisma.user.update({
      where: { id },
      data: { name, email, password },
    })
  }

  deleteUser(id: number){
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
