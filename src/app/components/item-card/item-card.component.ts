import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/shared/models';
import { ItemListService } from '../../pages/item-list/item-list.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  constructor(
    private router: Router,
    private itemListService: ItemListService
  ) {}
  @Input()
  items: Item[];

  delete(targetId: number) {
    this.itemListService.deletedItem(targetId);
  }

  navigateToItemPage(id: number) {
    this.router.navigate([`/item/${id}`]);
  }

  navigateToEditPage(id: number) {
    this.router.navigate([`/item/${id}/edit`]);
  }
}
