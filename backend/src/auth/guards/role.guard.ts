import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "../../users/entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("Controllo RUOLO");
    
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    
    const user = request.user;
    if(user){

      // let uRole = await this.userRepository.findOne(user.id, {relations: ["role"]})
      // const hasRole = () => roles.some((role) =>{ if(uRole && uRole.role && uRole.role.name == role) return true; else false;});
      // return hasRole();
      return await this.checkRole(user, roles[0]);
    }else{

      return false;
    }
  }

  async checkRole(user, role1): Promise<boolean>{
    let uRole = await this.userRepository.findOne(user.id, {relations: ["roles"]})
    console.log(role1);
    console.log(uRole.roles);

    const hasRole = () => uRole.roles.some((role) =>{ if(role.name == role1) return true; else false;});
    console.log(hasRole());

    return user && hasRole();
  }
}
