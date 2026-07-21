import "@nestjs/config";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DEVELOPMENT_ROUTE_EXCLUDE, PRODUCTION_ROUTE_EXCLUDE } from './common/exclude';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('/api', {
    exclude: process.env.NODE_ENV === "production" ? PRODUCTION_ROUTE_EXCLUDE : DEVELOPMENT_ROUTE_EXCLUDE
  })

  await app.listen(process.env.PORT ?? 5000, "0.0.0.0");
}
bootstrap();
