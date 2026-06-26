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
export class GetsFeeStructureResponse {
  id: number;
  total_fee: number;
}
export class GetsStudentDeatilResponse {
  id: number;
  roll_number: string;
  @Type(() => GetUserDetailsResponse)
  user: GetUserDetailsResponse;
  @Type(() => GetCoursesInfoResponse)
  course: GetCoursesInfoResponse;
}
export class GetStudentFeeResponse {
  id: number;
  amount_paid: number;
  due_amount: number;
  payment_status: PaymentStatus;
  payment_date: Date;
  @Type(() => GetsFeeStructureResponse)
  feeStructure: GetsFeeStructureResponse;
  @Type(() => GetsStudentDeatilResponse)
  student: GetsStudentDeatilResponse;
}
export class AdminListStudentFeeResponse {
  @Type(() => GetStudentFeeResponse)
  studentFees: GetStudentFeeResponse[];
  count: number;

  static decode(input: any): AdminListStudentFeeResponse {
    return plainToInstance(this, input);
  }
}
