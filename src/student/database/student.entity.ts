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
} from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({ unique: true, type: 'varchar', length: 10 })
  roll_number: string;

  @Column({ nullable: true })
  marks: number;

  @Column({ nullable: true })
  grade_points: number;

  @Column({ nullable: true })
  result: string;

  @ManyToOne(() => Course, (course) => course.students)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Semester, (semester) => semester.student)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @ManyToOne(() => User, (user) => user.student)
  user: User;

  // @OneToMany(() => StudentFees, fee => fee.student)
  // fees: FeesStructure[];
}
