import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from 'src/course/database/course.entity';
import { Subject } from 'src/subject/database/subject.entity';
import { Student } from 'src/student/database/student.entity';
import { FeesStructure } from 'src/fee/database/fee.entity';

@Entity('semesters')
export class Semester {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  semester_number: number;

  @Column()
  course_id: number;

  @ManyToOne(() => Course, (course) => course.semesters)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => Subject, (subject) => subject.semester)
  subjects: Subject[];

  @OneToMany(() => Student, (student) => student.semester)
  student: Student[];

  @OneToMany(() => FeesStructure, (fs) => fs.semester)
  fees: FeesStructure[];
}