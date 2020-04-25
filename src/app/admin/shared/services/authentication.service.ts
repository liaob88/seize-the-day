import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  signIn(email: string, password: string) {
    this.auth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigateByUrl('admin/dashboard'))
      .catch(error => {
        alert('ログインできません。エラー内容は（' + error.message + '）です');
      });
  }

  signOut() {
    this.auth.auth
      .signOut()
      .then(() => this.router.navigateByUrl('admin/login'));
  }
}
