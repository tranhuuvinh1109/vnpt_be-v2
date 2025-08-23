import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Public } from 'src/common/decorators/public.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /** Tạo accessToken và refreshToken */
  private generateTokens(payload: object) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_LIFE') || '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_LIFE') || '30d',
    });

    return { accessToken, refreshToken };
  }

  @Public()
  async signup(dto: SignupDto) {
    const { email, password, name } = dto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) throw new BadRequestException('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const payload = { email };
    const tokens = this.generateTokens(payload);

    const newUser = await this.usersService.create({
      email,
      password: hashedPassword,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    });

    return {
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      },
    };
  }

  /** Đăng nhập */
  @Public()
  async signin(dto: SigninDto) {
    const { email, password } = dto;

    const user = await this.usersService.findByEmail(email, true);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');

    const payload = { sub: user._id, email: user.email };
    const tokens = this.generateTokens(payload);

    await this.usersService.update(user._id as string, {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    });

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      },
    };
  }
}
