import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject_name: string;

  @Column({ unique: true })
  subject_code: string;

  @Column()
  credits: number;

  @Column()
  course_id: number;

  @Column()
  semester_id: number;

  @ManyToOne(() => Course, (course) => course.subjects)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Semester, (semester) => semester.subjects)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;
}
