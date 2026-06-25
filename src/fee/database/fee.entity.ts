import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('fees_structures')
export class FeesStructure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 2,
    default: 0.0,
  })
  tuition_fee: number;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 2,
    default: 0.0,
  })
  exam_fee: number;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 2,
    default: 0.0,
  })
  library_fee: number;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 2,
    default: 0.0,
  })
  other_fee: number;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 2,
    default: 0.0,
  })
  total_fee: number;

  @ManyToOne(() => Course, (course) => course.fees)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Semester, (semester) => semester.fees)
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
