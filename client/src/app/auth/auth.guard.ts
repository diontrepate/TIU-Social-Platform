import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor( private authService: AuthService, private router: Router ) { }

  canActivate( state: RouterStateSnapshot ): boolean {
    return true;
    if (this.authService.isValidated === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;

    }

  }

}
