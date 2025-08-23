import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
    signOptions: { expiresIn: configService.get<string>('ACCESS_TOKEN_LIFE') },
  }),
});
