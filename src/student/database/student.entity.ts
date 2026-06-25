import { Course } from 'src/course/database/course.entity';
import { FeesStructure } from 'src/fee/database/fee.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { User } from 'src/user/database/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ResultEnum } from '../enum/result.enum';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 10 })
  roll_number: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  marks: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  grade_points: number;

  @Column({
    type: 'enum',
    nullable: true,
    enum: ResultEnum,
  })
  result: ResultEnum;

  @ManyToOne(() => Course, (course) => course.students)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Semester, (semester) => semester.student)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
