import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise(res => {
      onAuthStateChanged(this.auth, user => {
        if (user) res(true);
        else {
          this.router.navigate(['/auth/login']);
          res(false);
        }
      });
    });
  }
}
