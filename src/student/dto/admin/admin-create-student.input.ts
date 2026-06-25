import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ResultEnum } from 'src/student/enum/result.enum';
import { Gender } from 'src/user/enums/gender.enum';
import { StatusEnum } from 'src/user/enums/status.enums';
import { UserRoles } from 'src/user/enums/user-role.enum';

@InputType()
export class AdminCreateStudentInput {
  @Field(() => String, { description: 'Roll Id of Student' })
  @IsString()
  @IsNotEmpty()
  roll_number: string;

  @Field(() => Int, { description: 'Marks of Student' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  marks: number;

  @Field(() => Int, { description: 'Grade point of student' })
  @IsNumber()
  @IsPositive()
  grade_points: number;

  @Field(() => ResultEnum, { description: 'Result of student' })
  @IsEnum(ResultEnum)
  @IsNotEmpty()
  result: ResultEnum;

  @Field(() => Int, { description: 'user Id', nullable: true })
  @IsNumber()
  @IsOptional()
  user_id: number;

  @Field(() => String, { description: 'Name of user', nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { description: 'Email of user', nullable: true })
  @IsEmail()
  @IsOptional()
  @IsString()
  email?: string;

  @Field(() => String, { description: 'Password of user', nullable: true })
  @IsString()
  @IsOptional()
  password?: string;

  @Field(() => Gender, { description: 'Gender of user', nullable: true })
  @IsOptional()
  gender?: Gender;

  @Field(() => StatusEnum, { description: 'Status of an user', nullable: true })
  @IsOptional()
  status?: StatusEnum;

  @Field(() => UserRoles, {
    description: 'Role of an user',
    nullable: true,
    defaultValue: 2,
  })
  @IsOptional()
  role: UserRoles;

  @Field(() => Int, { description: 'Course Id (Assigned to user)' })
  @IsNumber()
  @IsNotEmpty()
  course_id: number;

  @Field(() => Int, { description: 'Semester Id' })
  @IsNumber()
  @IsNotEmpty()
  semester_id: number;
}
