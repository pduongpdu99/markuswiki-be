import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoriesModule } from './api/categories/categories.module';
import { TagsModule } from './api/tags/tags.module';
import { ArticleModule } from './api/article/article.module';
import { PrismaModule } from '@providers/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SuffixResponse } from './interceptors/suff-response';

@Module({
  imports: [CategoriesModule, TagsModule, ArticleModule, PrismaModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SuffixResponse
    }
  ]
})
export class AppModule { }
