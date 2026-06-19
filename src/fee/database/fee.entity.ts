import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';


@Entity('fees_structures')
export class FeesStructure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  course_id: number;

  @Column()
  semester_id: number;

  @Column('decimal')
  tuition_fee: number;

  @Column('decimal')
  exam_fee: number;

  @Column('decimal')
  library_fee: number;

  @Column('decimal')
  other_fee: number;

  @Column('decimal')
  total_fee: number;

  @ManyToOne(() => Course, course => course.fees)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Semester, semester => semester.fees)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  
}