import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private store: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // firestore
  getCollection<T>(collectionName: string): Observable<T[]> {
    return this.store
      .collection<T>(collectionName)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data } as T;
          });
        })
      );
  }

  getDoc<T>(id: string, collectionName: string): Observable<T> {
    return this.store
      .collection<T>(collectionName)
      .doc<T>(id)
      .valueChanges();
  }

  createDoc<T>(collectionName: string, data: T) {
    return this.store.collection<T>(collectionName).add(data);
  }

  updateDoc<T>(collectionName: string, id: string, data: Partial<T>) {
    return this.store
      .collection<T>(collectionName)
      .doc(id)
      .update(data);
  }

  // firestorage
  uploadToStorage(filePath: string, image: File) {
    return this.storage.upload(filePath, image);
  }
  getDLUrl(filePath: string): Observable<string> {
    return this.storage.ref(filePath).getDownloadURL();
  }
}
