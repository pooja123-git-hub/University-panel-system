import { plainToInstance, Type } from 'class-transformer';

export class GetCourseDetailResponse {
  id: number;
  course_name: string;
}
export class GetSemesterDetailResponse {
  id: number;
}
export class GetSubjectResponse {
  id: number;
  subject_name: string;
  subject_code: string;
  credits: number;
  @Type(() => GetSemesterDetailResponse)
  semesters: GetSemesterDetailResponse;
  @Type(() => GetCourseDetailResponse)
  course: GetCourseDetailResponse;
}
export class AdminGetSubjectResponse {
  @Type(() => GetSubjectResponse)
  subject: GetSubjectResponse;

  static decode(input: any): AdminGetSubjectResponse {
    return plainToInstance(this, input);
  }
}
