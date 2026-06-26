import { plainToInstance, Type } from 'class-transformer';
import { CourseType } from 'src/course/enums/course.enum';
import { PaymentStatus } from 'src/student-fees/enums/payment-status.enum';

export class GetUserDetailResponse {
  id: number;
  name: string;
}
export class GetCourseInfoResponse {
  id: number;
  course_name: string;
  course_type: CourseType;
}
export class GetFeeStructureResponse {
  id: number;
  total_fee: number;
}
export class GetsStudentDeatilResponse {
  id: number;
  roll_number: string;
  @Type(() => GetUserDetailResponse)
  user: GetUserDetailResponse;
  @Type(() => GetCourseInfoResponse)
  course: GetCourseInfoResponse;
}
export class GetStudentFeeResponse {
  id: number;
  amount_paid: number;
  due_amount: number;
  payment_status: PaymentStatus;
  payment_date: Date;
  @Type(() => GetFeeStructureResponse)
  feeStructure: GetFeeStructureResponse;
  @Type(() => GetsStudentDeatilResponse)
  student: GetsStudentDeatilResponse;
}
export class AdminGetStudentFeeResponse {
  @Type(() => GetStudentFeeResponse)
  studentFees: GetStudentFeeResponse;

  static decode(input: any): AdminGetStudentFeeResponse {
    return plainToInstance(this, input);
  }
}
