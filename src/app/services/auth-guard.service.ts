import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = sessionStorage.getItem('auth-token');
    const userRole = sessionStorage.getItem('user-role'); // Supondo que a role do usuário está armazenada no sessionStorage

    if (authToken) {
      const roles = next.data['roles'] as Array<string>;
      if (roles && roles.includes(userRole as string)) {
        return true;
      } else {
        this.router.navigate(['/login']); // Redirecione para uma página de não autorizado
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}