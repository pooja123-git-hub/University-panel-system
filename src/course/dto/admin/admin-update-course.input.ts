import { Field, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsPositive, IsString, ValidateNested  } from "class-validator";
import { CourseType } from "src/course/enums/course.enum";
import { AdminCreateCourseInput } from "./admin-create-course.input";


@InputType()
export class AdminUpdateCourseInput  extends AdminCreateCourseInput{

    @Field(()=>Int ,{description:"Course Id"})
    @IsNumber()
    course_id:number

    


}