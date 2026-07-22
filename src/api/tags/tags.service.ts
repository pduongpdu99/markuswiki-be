import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '@providers/prisma.service';
import { PaginationParams } from '../../common/interfaces/request';

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

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.tags.findMany({
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
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
