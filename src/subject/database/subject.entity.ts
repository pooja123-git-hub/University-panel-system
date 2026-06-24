import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  subject_name: string;

  @Column({ unique: true, type: 'varchar', length: 10 })
  subject_code: string;

  @Column({
    type: 'int',
  })
  credits: number;

  @ManyToOne(() => Course, (course) => course.subjects)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Semester, (semester) => semester.subjects)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

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
