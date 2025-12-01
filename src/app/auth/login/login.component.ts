import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form!: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // INICIALIZACIÓN CORRECTA DEL FORMULARIO AQUÍ
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    const { email, password } = this.form.value;

    this.authService.login(email!, password!)
      .then(() => {
        this.router.navigate(['/estudiantes']); // 👈 Redirigir a estudiantes
      })
      .catch(error => {
        console.error(error);
        this.errorMsg = this.getErrorMessage(error.code);
      });
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'No existe un usuario con este correo.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/user-disabled':
        return 'Este usuario ha sido deshabilitado.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Inténtalo más tarde.';
      case 'auth/invalid-credential':
      case 'auth/invalid-login-credentials':
        return 'Correo o contraseña incorrectos.';
      default:
        return 'Error al iniciar sesión. Verifica tus datos.';
    }
  }
}
