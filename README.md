# 📘 Sistema de Registro de Estudiantes

## 📝 Descripción del Proyecto

**Sistema de Registro de Estudiantes** es una aplicación web completa desarrollada con Angular 17 y Firebase que permite gestionar de manera eficiente estudiantes y cursos en una institución educativa. La aplicación ofrece autenticación segura, operaciones CRUD completas, visualización de estadísticas en tiempo real y un catálogo oficial de cursos para educación primaria y secundaria.

Este proyecto fue desarrollado como parte del Proyecto Final del curso **Programación Web con Angular**.

---

## 🚀 Tecnologías y Herramientas Utilizadas

### Frontend
- **Angular 17** - Framework principal con arquitectura modular
- **TypeScript** - Lenguaje de programación
- **HTML5 & SCSS** - Estructura y estilos
- **Bootstrap 5** - Framework CSS para diseño responsive
- **Font Awesome** - Iconografía

### Backend & Servicios
- **Firebase Authentication** - Autenticación de usuarios
- **Cloud Firestore** - Base de datos NoSQL en tiempo real
- **Firebase Hosting** - Alojamiento web
- **AngularFire** - Librería oficial de Angular para Firebase

### Herramientas de Desarrollo
- **RxJS** - Programación reactiva con Observables
- **Angular Router** - Navegación y rutas protegidas
- **Angular Forms** - Formularios reactivos con validaciones
- **Angular CLI** - Herramienta de línea de comandos

---

## 📋 Requisitos para Instalar y Ejecutar

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **npm** (versión 9 o superior)
- **Angular CLI** (versión 17)
- **Git**
- Cuenta de **Firebase** (gratuita)

### Instalación Paso a Paso

#### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/registro-estudiantes.git
cd registro-estudiantes
```

#### 2️⃣ Instalar Dependencias
```bash
npm install
```

#### 3️⃣ Configurar Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar **Authentication** (Email/Password)
3. Crear base de datos **Firestore** en modo de prueba
4. Copiar la configuración de Firebase

5. Editar el archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
  }
};
```

#### 4️⃣ Ejecutar el Proyecto en Desarrollo
```bash
ng serve -o
```

La aplicación se abrirá automáticamente en `http://localhost:4200`

#### 5️⃣ Compilar para Producción
```bash
ng build --configuration production
```

---

## 🏗️ Arquitectura de la Aplicación

### Estructura de Módulos

La aplicación sigue una arquitectura modular organizada de la siguiente manera:

```
src/app/
├── auth/                    → Módulo de Autenticación
│   ├── login/              → Componente de inicio de sesión
│   ├── registro/           → Componente de registro
│   ├── auth.service.ts     → Servicio de autenticación
│   └── auth.guard.ts       → Guardia de rutas protegidas
│
├── core/                    → Módulo Core (singleton)
│   ├── navbar/             → Barra de navegación
│   └── not-found/          → Página 404
│
├── estudiantes/             → Módulo de Estudiantes
│   ├── lista/              → Lista de estudiantes
│   ├── formulario/         → Formulario crear/editar
│   ├── estudiantes.service.ts → Servicio CRUD
│   └── _estudiante.model.ts   → Modelo de datos
│
├── cursos/                  → Módulo de Cursos
│   ├── lista/              → Lista de cursos
│   ├── catalogo/           → Catálogo oficial
│   ├── formulario/         → Formulario crear/editar
│   ├── cursos.service.ts   → Servicio CRUD
│   └── _curso.model.ts     → Modelo de datos
│
├── dashboard/               → Módulo Dashboard
│   ├── dashboard.component → Estadísticas y métricas
│   └── modales/            → Modales informativos
│
├── shared/                  → Módulo Compartido
│   ├── pipes/              → Pipes personalizados
│   │   └── capitalizar.pipe.ts
│   └── directives/         → Directivas personalizadas
│       └── resaltar.directive.ts
│
├── app.module.ts            → Módulo raíz
├── app-routing.module.ts    → Configuración de rutas
└── app.component.ts         → Componente principal
```

### Componentes Principales

#### 1. **Módulo de Autenticación** (`auth/`)
- **AuthService**: Gestiona login, registro y logout usando Firebase Authentication
- **AuthGuard**: Protege rutas que requieren autenticación
- **BehaviorSubject**: Mantiene el estado del usuario autenticado
- **Componentes**: Login y Registro con validaciones

#### 2. **Módulo de Estudiantes** (`estudiantes/`)
- **EstudiantesService**: CRUD completo con Firestore
- **Operaciones**: Crear, leer, actualizar, eliminar estudiantes
- **Características**: 
  - Filtrado en tiempo real
  - Validaciones de formulario
  - Pipe capitalizar para nombres
  - Directiva resaltar para destacar elementos
  - Descarga de reportes en Excel

#### 3. **Módulo de Cursos** (`cursos/`)
- **CursosService**: CRUD completo con Firestore
- **Catálogo Oficial**: 
  - 11 cursos de Educación Primaria
  - 10 cursos de Educación Secundaria
- **Características**:
  - Filtrado por nivel educativo
  - Autocompletado de cursos oficiales
  - Gestión de cursos personalizados

#### 4. **Módulo Dashboard** (`dashboard/`)
- **Estadísticas en Tiempo Real**:
  - Total de estudiantes registrados
  - Distribución por nivel educativo
  - Edad promedio general y por nivel
  - Grados activos
- **Modales Interactivos**:
  - Distribución de estudiantes por grado
  - Promedios de edad por nivel
  - Catálogo oficial de cursos
- **Animaciones**: Transiciones suaves con Angular Animations

#### 5. **Servicios Principales**

**AuthService** (`auth/auth.service.ts`)
- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Gestión del estado de autenticación

**EstudiantesService** (`estudiantes/estudiantes.service.ts`)
- `obtenerTodos()`: Lista todos los estudiantes
- `obtenerPorId(id)`: Obtiene un estudiante específico
- `agregar(estudiante)`: Crea nuevo estudiante
- `actualizar(id, estudiante)`: Actualiza estudiante
- `eliminar(id)`: Elimina estudiante

**CursosService** (`cursos/cursos.service.ts`)
- `obtenerTodos()`: Lista todos los cursos
- `obtenerPorId(id)`: Obtiene un curso específico
- `agregar(curso)`: Crea nuevo curso
- `actualizar(id, curso)`: Actualiza curso
- `eliminar(id)`: Elimina curso

### Flujo de Datos

```
Usuario → Componente → Servicio → Firebase → Firestore
                ↓                      ↓
            Template ← Observable ← Snapshot
```

1. El usuario interactúa con el componente
2. El componente llama al servicio correspondiente
3. El servicio se comunica con Firebase/Firestore
4. Los datos se reciben como Observables (RxJS)
5. El template se actualiza automáticamente

---

## 🌐 URL de Despliegue

**Aplicación desplegada en Firebase Hosting:**

🔗 **[https://registro-estudiantes-6eba1.web.app](https://registro-estudiantes-6eba1.web.app)**

> ✅ **Aplicación en vivo**: La aplicación está desplegada y accesible públicamente.

### Cómo Hacer el Deploy

```bash
# 1. Instalar Firebase CLI
npm install -g firebase-tools

# 2. Iniciar sesión
firebase login

# 3. Inicializar hosting
firebase init hosting

# 4. Compilar proyecto
ng build --configuration production

# 5. Desplegar
firebase deploy
```

---

## 📖 Manual de Usuario

### 1. Registro e Inicio de Sesión

#### Crear una Cuenta
1. Acceder a la aplicación
2. Hacer clic en **"Registrarse"**
3. Completar el formulario:
   - Email válido
   - Contraseña (mínimo 6 caracteres)
4. Hacer clic en **"Registrarse"**

#### Iniciar Sesión
1. Ingresar email y contraseña
2. Hacer clic en **"Iniciar Sesión"**
3. Serás redirigido al Dashboard

### 2. Dashboard Principal

Al iniciar sesión, verás el panel de control con:

- **📊 Estadísticas en Cards Interactivas**:
  - Total de estudiantes (clickeable)
  - Edad promedio (clickeable)
  - Grados activos (clickeable)

- **🎯 Accesos Rápidos**:
  - Ver Estudiantes
  - Ver Catálogo de Cursos
  - Descargar Reporte

#### Modales Informativos

**Modal de Estudiantes**: Muestra distribución por nivel educativo
- Total de estudiantes de primaria
- Total de estudiantes de secundaria
- Porcentajes del total

**Modal de Grados**: Muestra distribución por grado
- Lista de todos los grados activos
- Cantidad de estudiantes por grado
- Porcentaje de cada grado
- Barra de progreso visual

**Modal de Edad Promedio**: Muestra estadísticas de edad
- Promedio de edad en primaria
- Promedio de edad en secundaria
- Promedio general

**Modal de Catálogo de Cursos**: Muestra cursos oficiales
- Cursos de Educación Primaria (11 cursos)
  - Áreas principales: Matemática, Comunicación, Personal Social, Ciencia y Ambiente
  - Otras áreas: Arte, Educación Física, Inglés, etc.
- Cursos de Educación Secundaria (10 cursos)
  - Matemática, Comunicación, Inglés, Ciencias Sociales, etc.

### 3. Gestión de Estudiantes

#### Ver Lista de Estudiantes
1. Hacer clic en **"Ver Estudiantes"** desde el Dashboard
2. O navegar a **"Estudiantes"** en el menú

#### Crear Nuevo Estudiante
1. Hacer clic en **"Nuevo Estudiante"**
2. Completar el formulario:
   - **Nombre**: Texto (obligatorio)
   - **Apellido**: Texto (obligatorio)
   - **Edad**: Número entre 5 y 18 (obligatorio)
   - **Grado**: Seleccionar de la lista (obligatorio)
   - **Curso**: Autocompletado según el grado (obligatorio)
3. Hacer clic en **"Guardar"**

#### Editar Estudiante
1. En la lista, hacer clic en el botón **"Editar"** (ícono de lápiz)
2. Modificar los campos deseados
3. Hacer clic en **"Actualizar"**

#### Eliminar Estudiante
1. En la lista, hacer clic en el botón **"Eliminar"** (ícono de basura)
2. Confirmar la eliminación en el diálogo

#### Filtrar Estudiantes
- Usar la barra de búsqueda en la parte superior
- El filtro funciona en tiempo real
- Busca por nombre, apellido o grado

#### Descargar Reporte
- Hacer clic en **"Descargar Reporte Excel"**
- Se descargará un archivo Excel con todos los estudiantes

### 4. Gestión de Cursos

#### Ver Catálogo de Cursos
1. Hacer clic en **"Ver Catálogo de Cursos"** desde el Dashboard
2. Se abrirá un modal con todos los cursos oficiales organizados por nivel

#### Ver Lista de Cursos Personalizados
1. Navegar a **"Cursos"** en el menú
2. Ver todos los cursos creados

#### Crear Nuevo Curso
1. Hacer clic en **"Nuevo Curso"**
2. Completar el formulario:
   - **Nombre**: Nombre del curso (obligatorio)
   - **Descripción**: Descripción breve (obligatorio)
   - **Nivel**: Primaria o Secundaria (obligatorio)
3. Hacer clic en **"Guardar"**

#### Editar Curso
1. Hacer clic en el botón **"Editar"**
2. Modificar los campos
3. Hacer clic en **"Actualizar"**

#### Eliminar Curso
1. Hacer clic en el botón **"Eliminar"**
2. Confirmar la eliminación

#### Filtrar Cursos
- Usar la barra de búsqueda
- Filtrar por nombre o nivel educativo

### 5. Cerrar Sesión
1. Hacer clic en tu email en la barra de navegación
2. Seleccionar **"Cerrar Sesión"**

---

## 📌 Funcionalidades Destacadas

✅ **Autenticación Segura** con Firebase Authentication  
✅ **CRUD Completo** para Estudiantes y Cursos  
✅ **Validaciones** en todos los formularios  
✅ **Filtrado en Tiempo Real** con búsqueda instantánea  
✅ **Dashboard Interactivo** con estadísticas dinámicas  
✅ **Modales Informativos** con animaciones suaves  
✅ **Catálogo Oficial** de cursos de primaria y secundaria  
✅ **Autocompletado Inteligente** de cursos según grado  
✅ **Exportación a Excel** de reportes  
✅ **Pipes Personalizados** (capitalizar nombres)  
✅ **Directivas Personalizadas** (resaltar elementos)  
✅ **Diseño Responsive** compatible con móviles y tablets  
✅ **Rutas Protegidas** con AuthGuard  
✅ **Datos en Tiempo Real** con Firestore  

---

## 🧑‍💻 Autor

**Vicente Candia Arias**

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte del curso de Programación Web con Angular.

---

## 🆘 Soporte

Si tienes alguna pregunta o problema:
1. Revisa la documentación de [Angular](https://angular.io/docs)
2. Consulta la documentación de [Firebase](https://firebase.google.com/docs)
3. Contacta al desarrollador

---

**Última actualización**: Diciembre 2025