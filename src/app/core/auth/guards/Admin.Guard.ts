import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isadmin) { // Here we use the isadmin getter to check admin status
      // Allow access
      return true;
    } else {
      // Redirect to 500 error page if not admin
      this.router.navigate(['/error/500']);
      return false;
    }
  }
}
