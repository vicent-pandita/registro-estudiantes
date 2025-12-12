import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any = null;  // Guarda email + role

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // 🟢 Mantener usuario actualizado
    this.authService.user$.subscribe(u => {
      this.user = u;
      console.log("Usuario logeado:", u);
    });
  }

  // 🟢 Solo será admin si role === 'admin'
  get isAdmin() {
    return this.user?.role === 'admin';
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
