import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../shared/models';
import { ItemListService } from '../item-list/item-list.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private itemListService: ItemListService
  ) {}

  item: Item;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.itemListService.itemsStoreState$.subscribe(itemsStoreState => {
        this.item = itemsStoreState.items.find(i => i.id === id);
      });
    });
  }
}
