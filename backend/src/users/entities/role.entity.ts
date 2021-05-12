import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {User} from './user.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'createAt'})
    createAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updateAt'})
    updateAt: Date;

    // @OneToMany(type => User, user => user.role)
    // users: User[];
}
