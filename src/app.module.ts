import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoriesModule } from './api/categories/categories.module';
import { TagsModule } from './api/tags/tags.module';
import { ArticleModule } from './api/article/article.module';
import { PrismaModule } from '@providers/prisma.module';

@Module({
  imports: [CategoriesModule, TagsModule, ArticleModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule { }
