import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from "./role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'createAt'})
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updateAt'})
  updateAt: Date;

  // @ManyToOne(type => Role, role => role.users)
  // role: Role;

  @ManyToMany(type => Role, {cascade: ['insert', 'update', 'remove']})
  @JoinTable()
  roles: Role[];

  @Column({name: 'firstName'})
  firstName: string;

  @Column({name: 'lastName'})
  lastName: string;
}
