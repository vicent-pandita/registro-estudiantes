import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, user => {
        if (user) {
          observer.next(true);
        } else {
          this.router.navigate(['/auth/login']);
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}
