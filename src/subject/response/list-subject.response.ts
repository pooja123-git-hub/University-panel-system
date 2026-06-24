import { plainToInstance, Type } from 'class-transformer';

export class GetCourseDetailsResponse {
  id: number;
  course_name: string;
}
export class GetSemesterDetailsResponse {
  id: number;
}
export class GetSubjectResponse {
  id: number;
  subject_name: string;
  subject_code: string;
  credits: number;
  @Type(() => GetSemesterDetailsResponse)
  semesters: GetSemesterDetailsResponse;
  @Type(() => GetCourseDetailsResponse)
  course: GetCourseDetailsResponse;
}
export class ListSubjectsResponse {
  @Type(() => GetSubjectResponse)
  subject: GetSubjectResponse[];
  count: number;

  static decode(input: any): ListSubjectsResponse {
    return plainToInstance(this, input);
  }
}
