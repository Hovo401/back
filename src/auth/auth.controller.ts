import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Req } from 'src/interface/req.interfece';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req: Req) {
    return this.usersService.findOne(req?.payload?.email ?? '');
  }

  @Public()
  @Post('regoister')
  async refresh(@Body() body: User) {
    body.password = await this.authService.hashPassword(body.password);
    const user = await this.usersService.createUser(body);
    const payload = { sub: user?.id, email: user?.email, roles: user?.roles };
    return {
      user,
      access_token: 'Bearer ' + (await this.jwtService.signAsync(payload)),
    };
  }
}
