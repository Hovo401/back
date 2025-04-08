import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto) {
    return this.prisma.session.create({
      data: createSessionDto
    });
  }

  async findAll() {
    return this.prisma.session.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.session.findFirst({
      where: { id }
    });
  }

  async update(id: number, updateSessionDto: UpdateSessionDto, userId: number) {
    const session = await this.findOne(id);
    if (!session || +session.authorId !== +userId) {
      throw new ForbiddenException();
    }
    return this.prisma.session.update({
      where: { id },
      data: updateSessionDto
    })
  }

  async remove(id: number, userId: number) {
    const session = await this.findOne(id);
    if (!session || +session.authorId !== +userId) {
      throw new ForbiddenException();
    }
    return this.prisma.session.delete({
      where : { id }
    });
  }
}
