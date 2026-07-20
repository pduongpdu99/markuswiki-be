import { IsString } from 'class-validator'

export class CreateCategoryDto {
    created_at?: Date | string
    updated_at?: Date | string
    created_by?: number
    updated_by?: number

    @IsString()
    slug: string = ""

    @IsString()
    title: string = ""

    @IsString()
    description: string = ""

    @IsString()
    icon: string = ""

    @IsString()
    code: string = ""
}
