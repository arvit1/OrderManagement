import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {getConnection} from "typeorm";
import {User} from './users/entities/user.entity'
import * as bcrypt from 'bcrypt';
import {Role} from './users/entities/role.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Auth Server')
    .setDescription('The Auth Server API')
    .setVersion('1.0')
    .addTag('JWT auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('explorer', app, document);

  //Initialize User and Role
  initDB();
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
  
}

async function initDB(){
  
  const roleRepo = await getConnection().getRepository(Role);
  const userRepo = await getConnection().getRepository(User);

  //Crea Ruolo ADMIN
  const adminRole = await roleRepo.findOne(1).then(async (role)=>{
    if(role == undefined){
      role = await roleRepo.save({ id: 1, name:"ADMIN"});
    }
    return role;
  });

  //Crea Ruolo MEMBER
  const magazinaRole = await roleRepo.findOne(2).then(async (role)=>{
    if(role == undefined){
      role = await roleRepo.save({ id: 2, name:"MAGAZINA"});
    }
    return role;
  });

  const dyqanRole = await roleRepo.findOne(3).then(async (role)=>{
    if(role == undefined){
      role = await roleRepo.save({ id: 3, name:"DYQAN"});
    }
    return role;
  });

  const saltRounds = 10;
  //Create ADMIN
  await userRepo.findOne(1).then(async (user)=>{
    if(user == undefined){
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash("password", salt, async function(err, hash) {
          await getConnection().getRepository(User).save({ id: 1, username:"admin", email: "admin@admin.it", password: hash, roles:[adminRole, magazinaRole, dyqanRole], first_name: "adminFirst", last_name: "adminLast"});
        });
     });
    }
  });

  await userRepo.findOne(2).then(async (user)=>{
    if(user == undefined){
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash("password", salt, async function(err, hash) {
          await getConnection().getRepository(User).save({ id: 2, username:"magazina", email: "magazina@member.it", password: hash, roles:[magazinaRole, dyqanRole], first_name: "magazinaFirst", last_name: "magazinaLast"});
        });
     });
    }
  });

  await userRepo.findOne(3).then(async (user)=>{
    if(user == undefined){
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash("password", salt, async function(err, hash) {
          await getConnection().getRepository(User).save({ id: 3, username:"dyqan", email: "dyqan@member.it", password: hash, roles:[dyqanRole], first_name: "dyqanFirst", last_name: "dyqanLast"});
        });
      });
    }
  });
}

bootstrap();

