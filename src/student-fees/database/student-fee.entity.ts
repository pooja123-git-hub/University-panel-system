import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentStatus } from '../enums/payment-status.enum';
import { FeesStructure } from 'src/fee/database/fee.entity';
import { Student } from 'src/student/database/student.entity';

@Entity('student_fees')
export class StudentFees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 2,
    default: 0.0,
  })
  amount_paid: number;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 2,
    default: 0.0,
  })
  due_amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
  })
  payment_status: PaymentStatus;

  @ManyToOne(() => FeesStructure, (fees) => fees.studentFees)
  @JoinColumn({ name: 'fee_structure_id' })
  feeStructure: FeesStructure;

  @ManyToOne(() => Student, (student) => student.studentFees)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({
     type: 'timestamptz',
    nullable: true,
  })
  payment_date: Date;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  @Index()
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  deleted_at?: Date;
}
