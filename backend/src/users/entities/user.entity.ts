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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  create_at: Date;
  

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  update_at: Date;

  // @ManyToOne(type => Role, role => role.users)
  // role: Role;

  @ManyToMany(type => Role, {cascade: ['insert', 'update', 'remove']})
  @JoinTable()
  roles: Role[];

  @Column()
  first_name: string;

  @Column()
  last_name: string;
}
