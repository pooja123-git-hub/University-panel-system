import { plainToInstance, Type } from 'class-transformer';
import { CourseType } from 'src/course/enums/course.enum';
import { PaymentStatus } from 'src/student-fees/enums/payment-status.enum';

export class GetUserDetailsResponse {
  id: number;
  name: string;
}
export class GetCoursesInfoResponse {
  id: number;
  course_name: string;
  course_type: CourseType;
}
export class GetFeeStructuresResponse {
  id: number;
  total_fee: number;
}
export class GetsStudentsDeatilResponse {
  id: number;
  roll_number: string;
  @Type(() => GetUserDetailsResponse)
  user: GetUserDetailsResponse;
  @Type(() => GetCoursesInfoResponse)
  course: GetCoursesInfoResponse;
}
export class GetStudentsFeeResponse {
  id: number;
  amount_paid: number;
  due_amount: number;
  payment_status: PaymentStatus;
  payment_date: Date;
  @Type(() => GetFeeStructuresResponse)
  feeStructure: GetFeeStructuresResponse;
  @Type(() => GetsStudentsDeatilResponse)
  student: GetsStudentsDeatilResponse;
}
export class GetStudentFeesResponse {
  @Type(() => GetStudentsFeeResponse)
  studentFees: GetStudentsFeeResponse;

  static decode(input: any): GetStudentFeesResponse {
    return plainToInstance(this, input);
  }
}
