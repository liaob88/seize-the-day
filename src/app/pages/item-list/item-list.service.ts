import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../../shared/models';
import { actions } from '../../store/store';

@Injectable({ providedIn: 'root' })
export class ItemListService {
  constructor(private store$: Store<{ itemList: Item[] }>) {}

  readonly items$ = this.store$.select('itemList');

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
