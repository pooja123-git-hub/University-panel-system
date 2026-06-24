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
export class GetSubjectsResponse {
  @Type(() => GetSubjectResponse)
  subject: GetSubjectResponse;

  static decode(input: any): GetSubjectsResponse {
    return plainToInstance(this, input);
  }
}
