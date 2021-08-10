import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { User } from '../user';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import firebase from "firebase/app"



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
    ) { }

  register(user: User): Observable<boolean> {
    return from(this.afAuth
    .createUserWithEmailAndPassword(user.email, user.password))
    .pipe(
      switchMap((u) => 
        this.userCollection.doc( u.user?.uid)
        .set({...user, id: u.user?.uid})
        .then(() => true)
      ),
      catchError((err) => throwError(err))
    )
  }

    login(email: string, password: string) {
      return new Promise((resolve,reject) => {
        this.afAuth.signInWithEmailAndPassword(email,password)
        resolve(
          switchMap((u: any) => this.userCollection.doc<User>(u.user?.uid).valueChanges())
      )
    }) 
  }

  logout() {
    this.afAuth.signOut();
  }

  getUser() : Observable<any> {
    return this.afAuth.authState
    .pipe(
      switchMap(u => (u) ? this.userCollection.doc<User>(u.uid).valueChanges() : of(null))
    )
  }
  authenticateds() : Observable<boolean> {
    return this.afAuth.authState
    .pipe(
      map(u => (u) ? true: false)
    )
  }


  loginGoogle(): Observable<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return from (this.afAuth.signInWithPopup(provider))
    .pipe(
      tap((data) => console.log(data)),
      switchMap((u) => {
        const newUser = {
          firstname: String(u.user?.displayName),
          lastname: '',
          address: '',
          city: '',
          email: String( u.user?.email),
          mobilephone: '',
          phone: '',
          state: '',
          password: '',
          id: u.user?.uid
        };
        return this.userCollection.doc(u.user?.uid)
        .set(newUser).then(() => {return newUser})
      })
    )
  }
}
