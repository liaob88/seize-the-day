import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { getUniqueStr } from '../../shared/domains/unique_id_maker';
import { Item } from '../../shared/models';
import { ItemListService } from '../item-list/item-list.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemAddComponent implements OnInit {
  title: string = '';
  contents: string = '';
  constructor(
    private itemListService: ItemListService,
    private route: Router
  ) {}

  ngOnInit() {}

  async addItem() {
    const id = getUniqueStr();
    const title = this.title;
    const contents = this.contents;
    const createdAt = new Date();
    const newItem = new Item(id, title, contents, createdAt);
    await this.itemListService.addedItem(newItem);

    this.title = '';
    this.contents = '';

    this.route.navigateByUrl('/list');
  }
}
