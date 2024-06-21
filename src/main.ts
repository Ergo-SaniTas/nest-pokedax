import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('API');
  
  app.useGlobalPipes(
    new ValidationPipe({
      /* Permite que solo los campos especificados en 
         los DTO (Data Transfer Objects) sean aceptados*/
      whitelist: true, 
      //falle si se encuentran campos adicionales en la entrada
      forbidNonWhitelisted: true,
      /* Transforma los datos de entrada en instancias de los DTO. Esto significa 
        que los datos recibidos serán convertidos automáticamente al tipo 
        especificado en el DTO */
      transform: true,
      /* Permite la conversión implícita de tipos. Por ejemplo, los valores en la entrada 
        que parecen números serán convertidos automáticamente a números. */
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
