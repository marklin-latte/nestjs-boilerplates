import { Routes } from 'nest-router';
import { AppModule } from './app.module';
import { UserModule } from './domain/user/user.module';

export const routers: Routes = [
  {
    path: '/',
    module: AppModule,
    children: [
      {
        path: '/users',
        module: UserModule,
      },
    ],
  },
];
