import { plainToInstance, Type } from 'class-transformer';
import { CourseType } from 'src/course/enums/course.enum';
import { ResultEnum } from 'src/student/enum/result.enum';
import { Gender } from 'src/user/enums/gender.enum';
import {
  GetRoleResponse,
  GetStatusResponse,
} from 'src/user/response/register.response';

export class GetStudentCourseDetailResponse {
  id: number;
  course_name: string;
  course_type: CourseType;
}
export class GetStudentSemesterDetailResponse {
  id: number;
}
export class GetUserInfoResponse {
  id: number;
  name: string;
  email: string;
  @Type(() => GetRoleResponse)
  role: GetRoleResponse;
  @Type(() => GetStatusResponse)
  status: GetStatusResponse;
  gender: Gender;
  created_at: Date;
}
export class GetsStudentResponse {
  id: number;
  roll_number: string;
  grade_points: number;
  marks: number;
  result: ResultEnum;
  @Type(() => GetUserInfoResponse)
  user: GetUserInfoResponse;
  @Type(() => GetStudentCourseDetailResponse)
  course: GetStudentCourseDetailResponse;
  @Type(() => GetStudentSemesterDetailResponse)
  semester: GetStudentSemesterDetailResponse;
}
export class GetStudentResponse {
  @Type(() => GetsStudentResponse)
  student: GetsStudentResponse;

  static decode(input: any): GetStudentResponse {
    return plainToInstance(this, input);
  }
}
