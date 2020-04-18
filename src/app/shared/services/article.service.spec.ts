import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { ArticleService } from './article.service';

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

describe('articleService', () => {
  let articleService: ArticleService;
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
    articleService = TestBed.get(ArticleService);
    // firebaseService = TestBed.get(FirebaseService);
  });

  it('should be created', () => {
    expect(articleService).toBeTruthy();
  });
});
