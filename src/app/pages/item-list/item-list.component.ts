import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../shared/models';
import { ItemListService } from './item-list.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {
    this.items$ = this.itemListService.items$;
  }
}
