import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { User } from '../user';
import { catchError, map, switchMap } from 'rxjs/operators';



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
}