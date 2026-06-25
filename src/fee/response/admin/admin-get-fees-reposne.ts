import { plainToInstance, Type } from 'class-transformer';

export class GetCourseFeeDetailResponse {
  id: number;
  course_name: string;
}
export class GetSemesterFeeDetailResponse {
  id: number;
}
export class GetFeeResponse {
  id: number;
  tuition_fee: number;
  exam_fee: number;
  library_fee: number;
  other_fee: number;
  total_fee: number;

  @Type(() => GetSemesterFeeDetailResponse)
  semester: GetSemesterFeeDetailResponse;
  @Type(() => GetCourseFeeDetailResponse)
  course: GetCourseFeeDetailResponse;
}
export class AdminGetFeesResponse {
  @Type(() => GetFeeResponse)
  fees: GetFeeResponse;

  static decode(input: any): AdminGetFeesResponse {
    return plainToInstance(this, input);
  }
}
