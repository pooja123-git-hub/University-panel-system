import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Semester } from 'src/semester/database/semester.entity';
import { Subject } from 'src/subject/database/subject.entity';
import { Student } from 'src/student/database/student.entity';
import { FeesStructure } from 'src/fee/database/fee.entity';
import { Status } from 'src/status/database/status.entity';
import { CourseType } from '../enums/course.enum';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  course_name: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: CourseType,
  })
  course_type: CourseType;

  @Column({
    type: 'int',
  })
  total_semesters: number;

  @ManyToOne(() => Status, (status) => status.id)
  @Index()
  status: Status;

  @OneToMany(() => Semester, (semester) => semester.course, { cascade: true })
  semesters: Semester[];

  @OneToMany(() => Subject, (subject) => subject.course, { cascade: true })
  subjects: Subject[];

  @OneToMany(() => Student, (student) => student.course, { cascade: true })
  students: Student[];

  @OneToMany(() => FeesStructure, (feeS) => feeS.course, { cascade: true })
  fees: FeesStructure[];

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
