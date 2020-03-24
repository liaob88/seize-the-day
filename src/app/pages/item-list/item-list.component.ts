import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsStoreState } from './../../store/store';
import { ItemListService } from './item-list.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  constructor(private itemListService: ItemListService) {}
  itemsStoreState$: Observable<ItemsStoreState> = this.itemListService.itemsStoreState$;
}
