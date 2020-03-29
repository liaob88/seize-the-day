import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../../shared/models';
import { actions, featureName, ItemsStoreState } from '../../store/store';

@Injectable({ providedIn: 'root' })
export class ItemListService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  readonly items$: Observable<Item[]>;
  constructor(
    private store$: Store<{ [featureName]: ItemsStoreState }>,
    private db: AngularFirestore
  ) {
    this.itemsCollection = this.db.collection<Item>('items');
    this.items$ = this.itemsCollection.valueChanges();
  }

  readonly itemsStoreState$: Observable<ItemsStoreState> = this.store$.select(
    featureName
  );

  addedItem(item: Item) {
    this.store$.dispatch(actions.createItem({ item }));
  }

  deletedItem(id: number) {
    this.store$.dispatch(actions.deleteItem({ id }));
  }

  updatedItem(item: Item) {
    this.store$.dispatch(actions.updateItem({ item }));
  }
}
