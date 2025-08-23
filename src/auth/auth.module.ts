import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { UsersModule } from 'src/users/users.module';
import { usersProviders } from 'src/users/users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtConfig()),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, ...usersProviders],
  exports: [JwtModule, AuthGuard],
})
export class AuthModule {}
