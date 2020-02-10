import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { defaultLinks, adminLinks, Routes, employeeLinks } from './routes';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private user$ = new BehaviorSubject<User>(null);
  private links = new BehaviorSubject<Routes>(defaultLinks);

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      }),
    )
      .subscribe(user => {
        this.saveUser(user);
        this.setRoutes(user);
      });

  }

  getUser(): Observable<User> {
    return this.user$.asObservable();
  }

  getCurrentUser(): User {
    return this.user$.getValue();
  }

  private saveUser(user: User) {
    this.user$.next(user);
  }

  getRoutes(): Observable<Routes> {
    return this.links.asObservable();
  }

  private setRoutes(user: User) {
    let routes = defaultLinks;
    if (user) {
      switch (user.role) {
        case "Employee":
          routes = employeeLinks;
          break;
        case "Admin":
          routes = adminLinks;
          break;
        default:
          routes = defaultLinks;
      }
    }
    console.log(routes);
    this.links.next(routes);
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    // if (credential.additionalUserInfo.isNewUser)
    //   return this.updateUserData(credential);
    // return null;
  }

  async emailSignin(email: string, password: string) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    // if (credential.additionalUserInfo.isNewUser)
    //   return this.updateUserData(credential);
    // return null;
  }

  // private updateUserData(credential: auth.UserCredential) {
  //   const { user } = credential;
  //   // Sets user data to firestore on login
  //   const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  //   let data: User = {
  //     id: user.uid,
  //     email: user.email,
  //     name: user.displayName,
  //     photoURL: user.photoURL,
  //   };
  //   if (isNewUser) {
  //     console.log('welcome!');
  //     data.role = "Employee"
  //   };
  //   return userRef.set(data, { merge: true })

  // }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }


}
