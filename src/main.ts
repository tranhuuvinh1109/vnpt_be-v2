import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  const config = new DocumentBuilder()
    .setTitle('My API Docs')
    .setDescription('API documentation for my project')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const swOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      // defaultModelsExpandDepth: -1,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, swOptions);

  console.log("APP IS RUNNING ON PORT", (process.env.PORT ?? 3000))
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
