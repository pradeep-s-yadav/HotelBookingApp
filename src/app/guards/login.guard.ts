import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

export const loginGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);
  return loginService.isLoggedin?true: router.navigate(['/login']);
};
