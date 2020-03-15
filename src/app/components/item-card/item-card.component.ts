import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  readonly items$ = this.itemListService.items$;

  delete(targetId: number) {
    this.itemListService.deletedItem(targetId);
  }

  navigateToEditPage(id: number) {
    this.router.navigate([`/edit/${id}`]);
  }
}
