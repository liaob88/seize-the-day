import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// MEMO: あくまで firestore からデータをとるための Service で有り、ここに Article に関する仕様は入れない
export class FirebaseService {
  constructor(
    private store: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getCollection<T>(collectionName: string): Observable<T[]> {
    return this.store
      .collection<T>(collectionName, ref => ref.orderBy('createdAt', 'desc'))
      .snapshotChanges()
      .pipe(
        map(storeDatum => {
          return storeDatum.map((storeData: DocumentChangeAction<T>) => {
            const id = storeData.payload.doc.id;
            const data = storeData.payload.doc.data();
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

  deleteDoc<T>(collectionName: string, id: string) {
    return this.store
      .collection<T>(collectionName)
      .doc(id)
      .delete();
  }

  // firestorage
  uploadToStorage(filePath: string, image: File) {
    return this.storage.upload(filePath, image);
  }
  getDLUrl(filePath: string): Observable<string> {
    return this.storage.ref(filePath).getDownloadURL();
  }
}
