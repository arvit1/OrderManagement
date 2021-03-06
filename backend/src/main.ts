import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {getConnection} from 'typeorm';
import {User} from './users/entities/user.entity';
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

  // Initialize User and Role
  initDB();
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);

}

async function initDB() {
  let rootless;
  let dyqanRole;
  let magazinaRole;
  await getConnection().transaction(async transactionalEntityManager => {

    // Crea Ruolo ADMIN
    rootless = await transactionalEntityManager.connection.getRepository(Role).findOne(1).then(async (role) => {
      // tslint:disable-next-line:triple-equals
      if (role === undefined) {
        role = await transactionalEntityManager.connection.getRepository(Role).save({id: 1, name: 'ROOTLESS'});
      }
      return role;
    });
  });

  await getConnection().transaction(async transactionalEntityManager => {
    // Crea Ruolo MEMBER
    magazinaRole = await transactionalEntityManager.connection.getRepository(Role).findOne(2).then(async (role) => {
      if (role === undefined) {
        role = await transactionalEntityManager.connection.getRepository(Role).save({id: 2, name: 'EXPERT'});
      }
      return role;
    });
  });

  await getConnection().transaction(async transactionalEntityManager => {
    dyqanRole = await transactionalEntityManager.connection.getRepository(Role).findOne(3).then(async (role) => {
      if (role === undefined) {
        role = await transactionalEntityManager.connection.getRepository(Role).save({id: 3, name: 'CURIOUS'});
      }
      return role;
    });
  });

  const saltRounds = 10;
  // Create ADMIN
  await getConnection().transaction(async transactionalEntityManager => {
    await transactionalEntityManager.connection.getRepository(User).findOne(1).then(async (user) => {
      if (user === undefined) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash('password', salt, async (err2, hash) => {
            await transactionalEntityManager.connection.getRepository(User).save(
              {
                id: 1, username: 'ROOTLESS', email: 'admin@admin.it', password: hash, roles: [rootless, magazinaRole, dyqanRole],
                firstName: 'adminFirst', lastName: 'adminLast',
              });
          });
        });
      }
    });
  });

  await  getConnection().transaction(async transactionalEntityManager => {
    await transactionalEntityManager.connection.getRepository(User).findOne(2).then(async (user) => {
      if (user === undefined) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash('password', salt, async (err2, hash) => {
            await transactionalEntityManager.connection.getRepository(User).save(
              {
                id: 2, username: 'EXPERT', email: 'magazina@member.it', password: hash, roles: [magazinaRole, dyqanRole],
                firstName: 'magazinaFirst', lastName: 'magazinaLast',
              });
          });
        });
      }
    });
  });

  await  getConnection().transaction(async transactionalEntityManager => {
    await transactionalEntityManager.connection.getRepository(User).findOne(3).then(async (user) => {
      if (user === undefined) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash('password', salt, async (err2, hash) => {
            await transactionalEntityManager.connection.getRepository(User).save(
              {
                id: 3, username: 'CURIOUS', email: 'dyqan@member.it', password: hash, roles: [dyqanRole],
                firstName: 'dyqanFirst', lastName: 'dyqanLast',
              });
          });
        });
      }
    });
  });
}

bootstrap();
