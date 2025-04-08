import { Controller, Get, Post, Request, Body, Patch, Param, Delete, ForbiddenException, Put } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Req } from 'src/interface/req.interfece';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { Public } from 'src/auth/constants';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('/add')
  @Roles(Role.Ticher, Role.Admin)
  create(@Request() req: Req, @Body() createSessionDto: CreateSessionDto) {
    const userId = req.payload?.sub ?? -1;
    createSessionDto.authorId = userId;
    
    return this.sessionService.create(createSessionDto);
  }

  @Public()
  @Get('all')
  findAll() {
    return this.sessionService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(+id);
  }

  @Roles(Role.Ticher, Role.Admin)
  @Put('update/:id')
  update(@Request() req: Req, @Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    const userId = req.payload?.sub ?? -1;
    return this.sessionService.update(+id, updateSessionDto, userId);
  }

  @Roles(Role.Ticher, Role.Admin)
  @Delete('delete/:id')
  remove(@Request() req: Req, @Param('id') id: string) {
    const userId = req.payload?.sub ?? -1;
    
    return this.sessionService.remove(+id, userId);
  }
}
