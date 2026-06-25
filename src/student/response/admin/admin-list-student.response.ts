import { plainToInstance, Type } from 'class-transformer';
import { CourseType } from 'src/course/enums/course.enum';
import { ResultEnum } from 'src/student/enum/result.enum';
import { Gender } from 'src/user/enums/gender.enum';
import {
  GetRoleResponse,
  GetStatusResponse,
} from 'src/user/response/register.response';

export class GetStudentsCourseDetailResponse {
  id: number;
  course_name: string;
  course_type: CourseType;
}
export class GetStudentsSemesterDetailResponse {
  id: number;
}
export class GetUsersInfoResponse {
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
export class GetStudentsResponse {
  id: number;
  roll_number: string;
  grade_points: number;
  marks: number;
  result: ResultEnum;
  @Type(() => GetUsersInfoResponse)
  user: GetUsersInfoResponse;
  @Type(() => GetStudentsCourseDetailResponse)
  course: GetStudentsCourseDetailResponse;
  @Type(() => GetStudentsSemesterDetailResponse)
  semester: GetStudentsSemesterDetailResponse;
}
export class AdminListStudentResponse {
  @Type(() => GetStudentsResponse)
  student: GetStudentsResponse[];
  count: number;

  static decode(input: any): AdminListStudentResponse {
    return plainToInstance(this, input);
  }
}
