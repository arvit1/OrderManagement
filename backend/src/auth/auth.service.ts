import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IJWTPayload } from './interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {User} from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async signIn(payload: IJWTPayload): Promise<any> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    //const user: IJWTPayload = { email: 'user@email.com', password: "ciaociao" };
    //console.log(payload);
    let user;
    if(payload.email){
      user = await this.userRepository.findOne({ where: { email: payload.email}, relations: ["roles"]});
    }else if(payload.username){
      user = await this.userRepository.findOne({ where: { username: payload.username}, relations: ["roles"]});
    }else{
      throw UnauthorizedException;
    }
    
    if(user){
      let check = await bcrypt.compare(payload.password, user.password)
      if(check)
        return {...user, "token": this.jwtService.sign(payload)};
      else
        throw UnauthorizedException;
    }else{
      throw UnauthorizedException;
    }
    
  }

  async validateUser(payload: IJWTPayload): Promise<any> {
    if(payload.email){
      return await this.usersService.findSigned(payload.email, undefined, payload.password);
    }else if(payload.username){
      return await this.usersService.findSigned(undefined, payload.username, payload.password);
    }else{
      return undefined;
    }
    
  }
}
