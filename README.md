📘 Registro de Estudiantes – Proyecto Final Angular + Firebase

Este proyecto es una aplicación web desarrollada con Angular y Firebase, como parte del Proyecto Final del curso Programación Web con Angular.
La aplicación permite gestionar estudiantes y cursos, realizar operaciones CRUD, autenticación de usuarios y mostrar estadísticas en un dashboard.

📌 📂 Funcionalidades Principales
🔐 Autenticación (Firebase Authentication)

Registro de usuarios

Inicio de sesión

Cierre de sesión

Rutas protegidas con AuthGuard

👨‍🎓 Gestión de Estudiantes (CRUD)

Crear estudiantes

Editar estudiantes

Eliminar estudiantes

Listar estudiantes

Filtro en tiempo real

Uso del pipe personalizado capitalizar

Resaltado dinámico con la directiva appResaltar

📚 Gestión de Cursos (CRUD)

Crear cursos

Editar cursos

Eliminar cursos

Listar cursos

Filtro en tiempo real

📊 Dashboard

Total de estudiantes

Total de cursos

Datos en tiempo real desde Firestore

⚙️ Estructura profesional (con módulos)

Módulo de autenticación

Módulo de estudiantes

Módulo de cursos

Módulo dashboard

Módulo core (navbar, 404)

Módulo shared (pipes y directivas)

🛠 Tecnologías Utilizadas
✔ Angular 17 con Módulos
✔ Bootstrap 5
✔ Firebase:

Authentication

Firestore

Hosting

✔ AngularFire
✔ HTML / SCSS / TypeScript
✔ RxJS (Observables, BehaviorSubject)
📦 Instalación y Ejecución del Proyecto
🔹 1. Clonar el repositorio
git clone https://github.com/tu-usuario/registro-estudiantes.git

🔹 2. Instalar dependencias
npm install

🔹 3. Configurar Firebase

Editar archivo:

src/environments/environment.ts


Pegar tu configuración:

export const environment = {
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
  }
};

🔹 4. Ejecutar el proyecto
ng serve -o

🧱 Estructura de la Aplicación
src/app/
 ├── auth/                → Login, Registro, Guard, AuthService
 ├── core/                → Navbar, Página 404
 ├── estudiantes/         → CRUD completo
 ├── cursos/              → CRUD completo
 ├── dashboard/           → Estadísticas
 ├── shared/              → Pipes y Directivas
 ├── app.module.ts        → Módulo principal
 ├── app-routing.module.ts → Rutas principales
 └── app.component.*      → Contenedor principal

🧠 Descripción Breve de la Arquitectura
🔐 Autenticación:

Firebase Authentication

AuthService para login/register/logout

BehaviorSubject para estado del usuario

AuthGuard para rutas protegidas

📚 Firestore:

estudiantes colección

cursos colección

CRUD usando AngularFire + Observables

🎨 Componentes:

Formularios reactivos

Validaciones

Filtros en tiempo real

Pipes

Directivas personalizadas

🌍 Deploy en Firebase Hosting

Sigue estos pasos:

🔹 1. Instalar Firebase CLI
npm install -g firebase-tools

🔹 2. Iniciar sesión
firebase login

🔹 3. Inicializar hosting
firebase init hosting


Seleccionar:

✔ Use existing project
✔ registro-estudiantes
✔ Public directory: dist/registro-estudiantes/browser
✔ Configure as single-page app: YES
✔ No a GitHub deploy

🔹 4. Construir Angular
ng build

🔹 5. Subir a hosting
firebase deploy

🧑‍💻 Autor:

Vicente Candia Arias