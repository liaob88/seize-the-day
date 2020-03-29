import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../shared/models';
import { ItemListService } from '../item-list/item-list.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private itemListService: ItemListService
  ) {}

  item: Item;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.itemListService.items$.subscribe(items => {
        this.item = items.find(i => i.id === id);
      });
    });
  }
}
