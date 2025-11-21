import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "perfil-firebase-vicente",
        appId: "1:100058140867:web:47867d8c2b16653c425276",
        storageBucket: "perfil-firebase-vicente.firebasestorage.app",
        apiKey: "AIzaSyB8RX-Bx3TWFsjdM627xBvKiVB-6mCj05g",
        authDomain: "perfil-firebase-vicente.firebaseapp.com",
        messagingSenderId: "100058140867"
      })
    ),
    provideFirestore(() => getFirestore())
  ]
};
