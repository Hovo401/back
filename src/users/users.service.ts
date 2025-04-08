import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    

    async findOne(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async getUserRoles(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        })
    }



    async getUsers() {
      return this.prisma.user.findMany();
    }

    async createUser(user: User) {
    
      const user_ = await this.prisma.user.create({data: user});
      
      await this.prisma.ticher.create({data: {
        accountId: user_.id,
      }});
      return user_
    }

    async updateUser(id: number, name: string, email: string, password: string){
      return this.prisma.user.update({
        where: { id },
        data: { name, email, password },
      })
    }

    async deleteUser(id: number){
      return this.prisma.user.delete({
        where: { id },
      })
    }

    
}
