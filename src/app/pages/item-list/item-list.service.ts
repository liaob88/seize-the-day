import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../../shared/models';
import { actions, featureName, ItemsStoreState } from '../../store/store';

@Injectable({ providedIn: 'root' })
export class ItemListService {
  constructor(private store$: Store<{ [featureName]: ItemsStoreState }>) {}

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
