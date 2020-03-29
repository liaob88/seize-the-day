import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { skip } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { createMockItem } from '../../shared/factory/item';
import { Item } from '../../shared/models';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import * as itemsStore from '../../store/store';
import { actions as itemListActions } from '../../store/store';
import { ItemListService } from './item-list.service';

// delete
interface MockStoreType {
  [itemsStore.featureName]: itemsStore.ItemsStoreState;
}
// delete
const initialState: MockStoreType = {
  [itemsStore.featureName]: itemsStore.initialState
};

// const fakeInput: Item[][] = [[createMockFirestoreItem({})]];
// const fakeData = of(fakeInput);

// const collectionStub = {
//   valueChanges: jasmine.createSpy('valueChanges').and.returnValue(fakeData)
// };

// const angularFiresotreStub = {
//   collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
// };

// class MockFirestore implements Partial<AngularFirestore> {
//   collection = jasmine.createSpy('collection').and.returnValue(collectionStub);
// }

// class MockItemListService implements Partial<ItemListService> {
//   items$ = new BehaviorSubject<Item[]>(null);
// }

describe('ItemListService', () => {
  let itemListService: ItemListService;
  let store: MockStore<MockStoreType>;

  // let angularFirestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      declarations: [MarkdownPipe],
      providers: [
        provideMockStore({ initialState })
        // ItemListService,
        // { provide: AngularFirestore, useValue: angularFiresotreStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    itemListService = TestBed.get(ItemListService);
    store = TestBed.get(Store);
    // angularFirestore = TestBed.get(AngularFirestore);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(itemListService).toBeTruthy();
    // expect(angularFirestore.collection).toHaveBeenCalledWith('items');
  });

  // it('firestore の data が更新された時、itemListService の items$ が更新されること ', () => {
  //   angularFirestore.itemListService.items$.subscribe(itemListService => {
  //     console.log(itemListService);

  //     // expect(itemListService)
  //   });
  // });

  // it('items$ default', () => {
  //   itemListService.items$.subscribe(items => {
  //     expect(items.length).toBe(1);
  //   });
  // });

  it('store の情報が更新された時、items も更新されること', () => {
    const newItem = createMockItem({
      id: 3,
      title: 'Test 3'
    });
    const newStates: MockStoreType = {
      ...initialState,
      [itemsStore.featureName]: {
        items: [...itemsStore.initialState.items, newItem]
      }
    };

    store.setState(newStates);

    itemListService.itemsStoreState$.subscribe(itemsStoreState => {
      expect(itemsStoreState.items.length).toBe(2);
    });
  });

  it('addedItem() が実行されると、 actions.createItem が dispatch されること', async () => {
    const newItem: Item = createMockItem({});
    const createItemAction = itemListActions.createItem({ item: newItem });
    const expected = [createItemAction];
    const actions: Action[] = [];
    store.scannedActions$
      .pipe(skip(1))
      .subscribe(action => actions.push(action));

    await itemListService.addedItem(newItem);
    expect(actions).toEqual(expected);
  });

  it('deletedItem() が実行されると、 actions.deleteItem が dispatch されること', async () => {
    const targetItemId = 1;
    const deleteItemAction = itemListActions.deleteItem({ id: targetItemId });
    const expected = [deleteItemAction];
    const actions: Action[] = [];
    store.scannedActions$
      .pipe(skip(1))
      .subscribe(action => actions.push(action));

    await itemListService.deletedItem(targetItemId);
    expect(actions).toEqual(expected);
  });

  it('updatedItem() が実行されると、 actions.updateItem が dispatch されること', async () => {
    const updatedItem: Item = createMockItem({
      id: 1,
      title: 'Test 1 updated'
    });
    const updateItemAction = itemListActions.updateItem({ item: updatedItem });
    const expected = [updateItemAction];
    const actions: Action[] = [];
    store.scannedActions$
      .pipe(skip(1))
      .subscribe(action => actions.push(action));

    await itemListService.updatedItem(updatedItem);
    expect(actions).toEqual(expected);
  });
});
