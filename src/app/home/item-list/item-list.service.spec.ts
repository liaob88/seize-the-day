import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { ItemListService } from './item-list.service';

// class MockFirebaseService implements Partial<FirebaseService> {
//   getCollection<T>(collectionName: string): Observable<T[]> {
//     return of(createMockArticleCollectionOfStore() as []);
//   }
//   getDoc<T>(id: string, collectionName: string): Observable<T> {
//     return of(createMockArticleDocOfStore() as any);
//   }
//   getDLUrl() {
//     return of('download/url');
//   }
//   createDoc() {}
// }

describe('ItemListService', () => {
  let itemListService: ItemListService;
  // let firebaseService: MockFirebaseService;
  // const collectionName = 'articles';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule
      ],
      // providers: [{ provider: FirebaseService, useClass: MockFirebaseService }],
      schemas: [NO_ERRORS_SCHEMA]
    });
    itemListService = TestBed.get(ItemListService);
    // firebaseService = TestBed.get(FirebaseService);
  });

  it('should be created', () => {
    expect(itemListService).toBeTruthy();
  });
});
