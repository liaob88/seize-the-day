import { AngularFireStorageModule } from '@angular/fire/storage';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
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
      declarations: [MarkdownPipe],
      // providers: [{ provider: FirebaseService, useClass: MockFirebaseService }],
      schemas: [NO_ERRORS_SCHEMA]
    });
    itemListService = TestBed.get(ItemListService);
    // firebaseService = TestBed.get(FirebaseService);
  });

  it('should be created', () => {
    expect(itemListService).toBeTruthy();
  });

  // it('getArticle() が呼ばれると、firebaseService の getDoc() が正しい引数と共に呼ばれること ', () => {
  //   spyOn(firebaseService, 'getDoc');
  //   const id = '1';
  //   itemListService.getArticle(id);
  //   expect(firebaseService.getDoc);
  // });

  // it('addedItem() が実行されると、 actions.createItem が dispatch されること', async () => {
  //   const newItem: Item = createMockItem({});
  //   const createItemAction = itemListActions.createItem({ item: newItem });
  //   const expected = [createItemAction];
  //   const actions: Action[] = [];
  //   store.scannedActions$
  //     .pipe(skip(1))
  //     .subscribe(action => actions.push(action));

  //   await itemListService.addedItem(newItem);
  //   expect(actions).toEqual(expected);
  // });

  // it('deletedItem() が実行されると、 actions.deleteItem が dispatch されること', async () => {
  //   const targetItemId = 1;
  //   const deleteItemAction = itemListActions.deleteItem({ id: targetItemId });
  //   const expected = [deleteItemAction];
  //   const actions: Action[] = [];
  //   store.scannedActions$
  //     .pipe(skip(1))
  //     .subscribe(action => actions.push(action));

  //   await itemListService.deletedItem(targetItemId);
  //   expect(actions).toEqual(expected);
  // });

  // it('updatedItem() が実行されると、 actions.updateItem が dispatch されること', async () => {
  //   const updatedItem: Item = createMockItem({
  //     id: 1,
  //     title: 'Test 1 updated'
  //   });
  //   const updateItemAction = itemListActions.updateItem({ item: updatedItem });
  //   const expected = [updateItemAction];
  //   const actions: Action[] = [];
  //   store.scannedActions$
  //     .pipe(skip(1))
  //     .subscribe(action => actions.push(action));

  //   await itemListService.updatedItem(updatedItem);
  //   expect(actions).toEqual(expected);
  // });
});
