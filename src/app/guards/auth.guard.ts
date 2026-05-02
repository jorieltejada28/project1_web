import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { SigninService } from '../services/signin.service';

@Injectable({
  providedIn: 'root',
})
class AuthService {
  private signinService = inject(SigninService);
  private router = inject(Router);

  canActivate(): boolean {
    const token = this.signinService.getToken();
    if (token && !this.signinService.isTokenExpired(token)) {
      return true;
    }

    this.signinService.logout();
    return false;
  }
}

export const authGuard: CanActivateFn = () => {
  return inject(AuthService).canActivate();
};
