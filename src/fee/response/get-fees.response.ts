import { plainToInstance, Type } from 'class-transformer';

export class GetCourseFeesDetailResponse {
  id: number;
  course_name: string;
}
export class GetSemesterFeesDetailResponse {
  id: number;
}
export class GetFeeResponse {
  id: number;
  tuition_fee: number;
  exam_fee: number;
  library_fee: number;
  other_fee: number;
  total_fee: number;

  @Type(() => GetSemesterFeesDetailResponse)
  semesters: GetSemesterFeesDetailResponse;
  @Type(() => GetCourseFeesDetailResponse)
  course: GetCourseFeesDetailResponse;
}
export class GetFeesResponse {
  @Type(() => GetFeeResponse)
  fees: GetFeeResponse;

  static decode(input: any): GetFeesResponse {
    return plainToInstance(this, input);
  }
}
