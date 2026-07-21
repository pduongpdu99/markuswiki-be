import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '@providers/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) { }
  create(createTagDto: CreateTagDto) {
    return this.prisma.tags.create({
      data: createTagDto
    })
  }

  findAll() {
    return this.prisma.tags.findMany({
      select: {
        id: true,
        slug: true,
        code: true
      }
    }).then(async tags => {
      const counts = await Promise.all(
        tags.map((tag) =>
          this.prisma.article.count({
            where: {
              tags: {
                array_contains: [tag],
              },
            },
          }),
        ),
      );
      return tags.map((cate, index) => {
        cate['article_count'] = counts[index]
        return cate;
      })
    });
  }

  findOne(id: number) {
    return this.prisma.tags.findFirstOrThrow({
      where: { id }
    })
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.prisma.tags.update({
      where: { id },
      data: updateTagDto
    })
  }

  remove(id: number) {
    return this.prisma.tags.delete({ where: { id } })
  }
}
