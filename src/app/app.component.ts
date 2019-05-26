import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Chat APP';

  afUser$ = this.afAuth.authState;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
      this.router.navigateByUrl('/');
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
