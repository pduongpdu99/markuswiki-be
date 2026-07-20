import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '@providers/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) { }
  create(createTagDto: CreateTagDto) {
    return this.prismaService.tags.create({
      data: createTagDto
    })
  }

  findAll() {
    return this.prismaService.tags.findMany()
  }

  findOne(id: number) {
    return this.prismaService.tags.findFirstOrThrow({
      where: { id }
    })
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.prismaService.tags.update({
      where: { id },
      data: updateTagDto
    })
  }

  remove(id: number) {
    return this.prismaService.tags.delete({ where: { id } })
  }
}
