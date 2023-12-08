import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true,
    transform: true, // Transforma la data que llega a los DTO
    transformOptions: {
      enableImplicitConversion: true // activa la conversion implicita de los tipo de datos que llegan a los DTO      
    }
  }));

  await app.listen(process.env.PORT);
}
bootstrap();
