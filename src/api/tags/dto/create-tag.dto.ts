import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
    created_at?: Date | string
    updated_at?: Date | string
    created_by?: number
    updated_by?: number

    @IsString()
    @IsNotEmpty()
    slug: string = ""

    @IsString()
    @IsNotEmpty()
    code: string = ""
}
