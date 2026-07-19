import { IsString } from 'class-validator'

export class CreateCategoryDto {
    created_at?: string
    updated_at?: string
    created_by?: string
    updated_by?: string

    @IsString()
    slug: string = ""

    @IsString()
    title: string = ""

    @IsString()
    description: string = ""

    @IsString()
    icon: string = ""
}
