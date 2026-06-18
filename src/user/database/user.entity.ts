import { Role } from 'src/role/database/role.entity';
import { Status } from 'src/status/database/status.entity';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
    length: 8,
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @ManyToOne(() => Role, (role) => role.id, { cascade: true })
  @Index()
  role: Role;

  @ManyToOne(() => Status, (status) => status.id)
  status: Status;

  @Column({
    type: 'timestamptz',
    default: null,
  })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    default: null,
  })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
