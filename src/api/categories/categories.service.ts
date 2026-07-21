import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@providers/prisma.service';


@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.categories.create({ data: createCategoryDto })
  }

  findAll() {
    return this.prisma.categories.findMany({
      select: {
        id: true,
        code: true,
        description: true,
        icon: true,
        slug: true,
        title: true,
      }
    }).then(async categories => {
      const counts = await Promise.all(categories.map(cate => this.prisma.article.count({ where: { category_id: cate.id } })))
      return categories.map((cate, index) => {
        cate['article_count'] = counts[index]
        return cate;
      })
    });
  }

  findOne(id: number) {
    return this.prisma.categories.findUnique({
      where: { id }
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.categories.update({
      where: { id },
      data: updateCategoryDto
    })
  }

  remove(id: number) {
    return this.prisma.categories.delete({
      where: { id }
    })
  }
}
