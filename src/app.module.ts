import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [AuthModule, DatabaseModule, SessionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
