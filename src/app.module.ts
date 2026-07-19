import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './api/categories/categories.module';
import { TagsModule } from './api/tags/tags.module';
import { ArticleModule } from './api/article/article.module';

@Module({
  imports: [CategoriesModule, TagsModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
