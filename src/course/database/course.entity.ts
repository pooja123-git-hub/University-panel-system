import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Semester } from 'src/semester/database/semester.entity';
import { Subject } from 'src/subject/database/subject.entity';
import { Student } from 'src/student/database/student.entity';
import { FeesStructure } from 'src/fee/database/fee.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  course_name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  course_type: string;

  @Column({
    type: 'int',
  })
  total_semesters: number;

  @OneToMany(() => Semester, (semester) => semester.course)
  semesters: Semester[];

  @OneToMany(() => Subject, (subject) => subject.course)
  subjects: Subject[];

  @OneToMany(() => Student, (student) => student.course)
  students: Student[];

  @OneToMany(() => FeesStructure, (feeS) => feeS.course)
  fees: FeesStructure[];
}
