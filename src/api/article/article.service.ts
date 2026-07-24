import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '@providers/prisma.service';
import { ArticlePaginationParams } from '../../common/interfaces/request';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) { }

  create(dto: CreateArticleDto) {
    return this.prisma.article.create({ data: dto })
  }

  async findAll(query: ArticlePaginationParams) {
    const page = Math.max(Number(query.page ?? '1'), 1);
    const limit = Math.min(
      Math.max(Number(query.limit ?? '10'), 1),
      100,
    );

    const isAll = query.all === 'true';

    const tags = query.tags
      ?.split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const q = query.q;

    let where: any = tags?.length
      ? { tags: { array_contains: tags, }, }
      : undefined;

    if (q) {
      if (!where) where = {}
      where.OR = [
        {
          category: {
            title: { contains: q },
            title_vi: { contains: q },
            description: { contains: q },
            description_vi: { contains: q },
          },
        },
        {
          tags: {
            array_contains: q
          }
        },
        {
          title: { contains: q },
          title_vi: { contains: q },
          description: { contains: q },
          description_vi: { contains: q },
        }
      ]
    }

    if (isAll) {
      return this.prisma.article.findMany({
        where,
        include: {
          category: {
            select: {
              code: true,
              id: true,
            }
          }
        },
        orderBy: {
          created_at: 'desc',
        },
      });
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        skip,
        include: {
          category: {
            select: {
              code: true,
              id: true,
            }
          }
        },
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
      }),

      this.prisma.article.count({
        where,
      }),
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
    return this.prisma.article.findUnique({
      where: { id }
    });
  }

  findArticleBySlug(slug: string) {
    return this.prisma.article.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            code: true,
            id: true,
          }
        }
      }
    });
  }

  update(id: number, dto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: dto
    })
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: { id }
    })
  }
}
