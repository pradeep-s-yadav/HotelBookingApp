import {inject} from '@angular/core'
import { CanMatchFn } from '@angular/router';
import { LoginService } from '../login/login.service';

export const adminGuard: CanMatchFn = (route, segments) => {

  const loginService = inject(LoginService);
  return loginService.isAdmin;
};
