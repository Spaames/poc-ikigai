import { IsNotEmpty, IsString } from "class-validator";

export class AuthBodyDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    password: string;
}