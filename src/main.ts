import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ROUTE_EXCLUDE } from './common/exclude';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('/api', { exclude: ROUTE_EXCLUDE })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
