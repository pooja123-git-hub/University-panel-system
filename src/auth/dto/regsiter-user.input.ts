import { Field, InputType } from "@nestjs/graphql";
import { Gender } from "src/user/enums/gender.enum";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RegisterUserInput {

    @Field(()=>String,{description:"Name of user"})
    @IsString()
    @IsNotEmpty()
    name:string

    @Field(()=>String ,{description:"Email of user"})
    @IsEmail()
    @IsString()
    email:string

    @Field(()=>String,{description:"Password of user"})
    @IsNotEmpty()
    @IsString()
    password:string

    @Field(()=>Gender,{description:"Gender of user"})
    gender:Gender

    // @Field(()=>)
}