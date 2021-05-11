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
    // tslint:disable-next-line:variable-name
  create_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    // tslint:disable-next-line:variable-name
  update_at: Date;

  // @ManyToOne(type => Role, role => role.users)
  // role: Role;

  @ManyToMany(type => Role, {cascade: ['insert', 'update', 'remove']})
  @JoinTable()
  roles: Role[];

  @Column()
    // tslint:disable-next-line:variable-name
  first_name: string;

  @Column()
    // tslint:disable-next-line:variable-name
  last_name: string;
}
