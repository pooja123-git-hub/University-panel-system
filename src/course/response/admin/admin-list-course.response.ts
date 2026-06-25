import { plainToInstance, Type } from 'class-transformer';
import { CourseType } from 'src/course/enums/course.enum';
import { GetStatusResponse } from 'src/user/response/register.response';

export class GetSemesterResponse {
  id: number;
  semester_number: number;
}

export class GetCourseResponse {
  id: number;
  course_name: string;
  course_type: CourseType;
  total_semesters: number;
  @Type(() => GetSemesterResponse)
  semesters: GetSemesterResponse[];
  @Type(() => GetStatusResponse)
  status: GetStatusResponse;
}

export class AdminListCourseResponse {
  list_course: GetCourseResponse[];
  count: number;

  static decode(input: any): AdminListCourseResponse {
    return plainToInstance(this, input);
  }
}
