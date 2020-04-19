import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth) {}

  signIn(email: string, password: string) {
    this.auth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      alert('ログインできません。エラー内容は（' + error.message + '）です');
    });
  }

  signOut() {
    this.auth.auth.signOut();
  }

  isAuthenticated(): boolean {
    let authState;
    this.auth.auth.onAuthStateChanged(user => {
      if (!user) {
        authState = false;
      }
      authState = true;
    });
    return authState;
  }
}
