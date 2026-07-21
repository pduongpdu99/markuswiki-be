import { IsInt, IsJSON, IsString } from "class-validator";

export class CreateArticleDto {
    created_at?: Date | string
    updated_at?: Date | string
    created_by?: number
    updated_by?: number

    @IsString()
    title: string = ""

    @IsString()
    title_vi: string = ""

    @IsString()
    description: string = ""

    @IsString()
    description_vi: string = ""

    @IsString()
    content: string = ""

    @IsString()
    content_vi: string = ""

    @IsString()
    slug: string = ""

    @IsString()
    author: string = ""

    @IsString()
    thumbnail: string = ""

    @IsInt()
    category_id: number = 0

    @IsJSON()
    tags: Record<string, string>[] = []

    @IsInt()
    readingTime: number = 0

    @IsJSON()
    toc: Record<string, string>[] = []

    @IsJSON()
    related_article: Record<string, string>[] = [] // list of slug
}
