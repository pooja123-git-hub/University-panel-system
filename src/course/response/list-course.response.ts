import { plainToInstance, Type } from 'class-transformer';
import { CourseType } from 'src/course/enums/course.enum';
import { GetStatusResponse } from 'src/user/response/register.response.entity';

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

export class ListCourseResponse {
  list_course: GetCourseResponse[];
  count: number;

  static decode(input: any): ListCourseResponse {
    return plainToInstance(this, input);
  }
}
