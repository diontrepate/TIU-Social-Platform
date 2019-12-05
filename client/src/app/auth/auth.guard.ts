import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor( private authService: AuthService, private router: Router ) { }

  canActivate( state: RouterStateSnapshot ): boolean {
    if (this.authService.checkStorage() === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}
