import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '@providers/prisma.service';
import { PaginationParams } from '../../common/interfaces/request';
import { Prisma } from '@prisma/prisma/client';
import { articleCountForTags } from '../../common/sql_statements/tags';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) { }
  create(createTagDto: CreateTagDto) {
    return this.prisma.tags.create({
      data: createTagDto
    })
  }

  async findAll(query: PaginationParams) {
    const page = Math.max(Number(query.page ?? '1'), 1);
    const limit = Math.min(
      Math.max(Number(query.limit ?? '10'), 1),
      100,
    );

    const isAll = query.all === 'true';


    if (isAll) {
      return this.prisma.tags.findMany({
        orderBy: {
          created_at: 'desc',
        },
      }).then(async tags => {
        const tags_article_count = (
          await this.prisma.$queryRaw<{ id: number; article_count: bigint }[]>(articleCountForTags)
        ).map(item => ({
          ...item,
          article_count: Number(item.article_count),
        }))

        // convert refer 
        const refer: Record<number, number> = {}
        tags_article_count.forEach((item) => {
          refer[item.id] = item.article_count
        })

        return tags.map((cate) => {
          cate['article_count'] = refer[cate.id]
          return cate;
        })
      });
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.tags.findMany({
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
      }).then(async tags => {
        const tags_article_count = (
          await this.prisma.$queryRaw<{ id: number; article_count: bigint }[]>(articleCountForTags)
        ).map(item => ({
          ...item,
          article_count: Number(item.article_count),
        }))

        // convert refer 
        const refer: Record<number, number> = {}
        tags_article_count.forEach((item) => {
          refer[item.id] = item.article_count
        })

        return tags.map((cate) => {
          cate['article_count'] = refer[cate.id]
          return cate;
        })
      }),

      this.prisma.tags.count(),
    ]);

    return {
      items: data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
