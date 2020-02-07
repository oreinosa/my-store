import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { defaultLinks, adminLinks } from './routes';
import { Link } from '../shared/models/link.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<User>;
  private links = new BehaviorSubject<Link[]>(defaultLinks);

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    ),
      tap((user: User) => this.setRoutes(user.role))
  }

  getRoutes(): Observable<Link[]> {
    return this.links.asObservable();
  }

  private setRoutes(role: string) {
    let routes = defaultLinks;
    switch (role) {
      // case "Customer":
      //   routes = customerRoutes;
      //   break;
      case "Admin":
        routes = adminLinks;
        break;
      default:
        routes = defaultLinks;
    }

    this.links.next(routes);
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential);
  }

  private updateUserData(credential: auth.UserCredential) {
    const { user, additionalUserInfo: { isNewUser } } = credential;
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    let data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    if (isNewUser) data.role = "Customer";
    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }


}
