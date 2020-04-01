import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemListService } from '../item-list/item-list.service';
import { Article } from './../../shared/models';

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

  item: Article;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.itemListService
        .getArticle(id)
        .subscribe(article => (this.item = article));
    });
  }
}
