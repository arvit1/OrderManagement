import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {IUser} from './interfaces/user.interface'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: IUser) {
    this.userRepository.create(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
    //return this.users;
  }

  async findSigned(email:string | undefined, username: string | undefined, pass:string): Promise<User>{

    let user;
    if(email){
      user = await this.userRepository.findOne({ where: { email: email}, relations: ["roles"]});
    }else if(username){
      user = await this.userRepository.findOne({ where: { username: username}, relations: ["roles"]});
    }else{
      user = undefined;
    }
    return user;
  }

    
/*
  findOne(id:number): User {
    //return this.users[id];
  }
*/
}
