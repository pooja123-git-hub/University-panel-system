import { Role } from 'src/role/database/role.entity';
import { Status } from 'src/status/database/status.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../enums/gender.enum';
import { Student } from 'src/student/database/student.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: null,
    nullable: true,
  })
  gender: Gender;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: true,
  })
  refresh_token: string;

  @ManyToOne(() => Role, (role) => role.id, { cascade: true })
  @Index()
  role: Role;

  @ManyToOne(() => Status, (status) => status.id)
  status: Status;

  @OneToOne(() => Student, (student) => student.user, { cascade: true })
  student: Student;

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
