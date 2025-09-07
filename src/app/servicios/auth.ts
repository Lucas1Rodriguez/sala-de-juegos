import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null;

  constructor(private auth: Auth) {
    // 🔍 Escucha cambios de login/logout
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}

