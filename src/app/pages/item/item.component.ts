import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemListService } from '../item-list/item-list.service';
import { ArticleOfStore } from './../../shared/models';

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

  item$: Observable<ArticleOfStore>;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.item$ = this.itemListService.getArticle(id);
    });
  }
}
