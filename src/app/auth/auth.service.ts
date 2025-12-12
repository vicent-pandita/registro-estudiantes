import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// ⭐ Firestore
import { doc, setDoc, getDoc, getFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userState = new BehaviorSubject<any>(null);
  user$ = this.userState.asObservable();

  constructor(private auth: Auth, private router: Router) {
    // 🟢 Restaurar sesión al recargar página
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const db = getFirestore();
        const snap = await getDoc(doc(db, "users", user.uid));

        const role = snap.exists() ? snap.data()['role'] : 'usuario';

        this.userState.next({
          uid: user.uid,
          email: user.email,
          role: role
        });
      } else {
        this.userState.next(null);
      }
    });
  }

  // 🔹 LOGIN
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(async (cred) => {
        const db = getFirestore();
        const snap = await getDoc(doc(db, "users", cred.user.uid));

        if (snap.exists()) {
          const data = snap.data();
          this.userState.next({
            uid: cred.user.uid,
            email: cred.user.email,
            role: data['role']      // ⭐ Guardamos el rol en memoria
          });
        }

        return cred;
      });
  }

  // 🔹 REGISTRO CON ROL POR DEFECTO
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (cred) => {

        const db = getFirestore();

        // ⭐ Guardar usuario en Firestore con ROL por defecto
        await setDoc(doc(db, "users", cred.user.uid), {
          email,
          role: "admin" // 🟢 Por defecto ADMIN para que pueda editar todo
        });

        return cred;
      });
  }

  // 🔹 LOGOUT
  logout() {
    return signOut(this.auth).then(() => {
      this.userState.next(null); // limpiar memoria
      this.router.navigate(['/auth/login']);
    });
  }
}
