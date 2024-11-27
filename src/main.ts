import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException, ValidationFilter } from './utils/filter.validation';
import { ValidationError } from 'class-validator';
import 'reflect-metadata'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/auth')
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const errMsg = {};
        errors.forEach((err) => {
          errMsg[err.property] = [...Object.values(err.constraints)];
        });
        return new ValidationException(errMsg);
      },
    }),
  );

  app.use('/health', (req: Request, res: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).send('OK');
  });
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your allowed origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies or credentials
  });
  console.log(process.env.PORT)
  const port=process.env.PORT||3000
  await app.listen(port);
  
}
bootstrap();
