import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PublicGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        return this.authService.user$.pipe(
            take(1),
            map(user => {
                if (user) {
                    // Si el usuario ya está logueado, lo mandamos al dashboard
                    this.router.navigate(['/dashboard']);
                    return false;
                }
                // Si no está logueado, puede entrar al login/register
                return true;
            })
        );
    }
}
