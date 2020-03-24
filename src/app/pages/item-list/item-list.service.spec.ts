import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { skip } from 'rxjs/operators';
import { Item } from '../../shared/models';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import * as itemsStore from '../../store/store';
import { actions as itemListActions } from '../../store/store';
import { ItemListService } from './item-list.service';

interface MockStoreType {
  [itemsStore.featureName]: itemsStore.ItemsStoreState;
}

const initialState: MockStoreType = {
  [itemsStore.featureName]: itemsStore.initialState
};

describe('ItemListService', () => {
  let itemListService: ItemListService;
  let store: MockStore<MockStoreType>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkdownPipe],
      providers: [provideMockStore({ initialState })],
      schemas: [NO_ERRORS_SCHEMA]
    });
    itemListService = TestBed.get(ItemListService);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    const type: ItemListService = TestBed.get(ItemListService);
    expect(type).toBeTruthy();
  });

  it('items$ default', () => {
    itemListService.itemsStoreState$.subscribe(itemsStoreState => {
      expect(itemsStoreState.items.length).toBe(2);
    });
  });

  it('store の情報が更新された時、items も更新されること', () => {
    const newItem = {
      id: 3,
      title: 'Test 3',
      contents: 'contents',
      createdAt: new Date('2020-01-03')
    };
    const newStates: MockStoreType = {
      ...initialState,
      [itemsStore.featureName]: {
        items: [...itemsStore.initialState.items, newItem]
      }
    };

    store.setState(newStates);

    itemListService.itemsStoreState$.subscribe(itemsStoreState => {
      expect(itemsStoreState.items.length).toBe(3);
    });
  });

  it('addedItem() が実行されると、 actions.createItem が dispatch されること', async () => {
    const newItem: Item = {
      id: 2,
      title: 'Test 2',
      contents: 'contents',
      createdAt: new Date('2020-01-01')
    };
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
    const updatedItem: Item = {
      id: 1,
      title: 'Test 1 updated',
      contents: 'contents',
      createdAt: new Date('2020-01-01')
    };
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
