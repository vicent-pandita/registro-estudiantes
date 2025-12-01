import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  form!: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    const { email, password } = this.form.value;

    this.authService.register(email!, password!)
      .then(() => this.router.navigate(['/auth/login']))
      .catch(error => {
        console.error(error); // Para depuración
        this.errorMsg = this.getErrorMessage(error.code);
      });
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está registrado.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/weak-password':
        return 'La contraseña es muy débil (mínimo 6 caracteres).';
      case 'auth/missing-password':
        return 'La contraseña es obligatoria.';
      default:
        return 'Ocurrió un error al registrarse. Inténtalo de nuevo.';
    }
  }
}
