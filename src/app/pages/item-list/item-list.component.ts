import { ArticleOfStore } from './../../shared/models';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../shared/models';
import { ItemListService } from './item-list.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items$: Observable<ArticleOfStore[]>;

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {
    this.items$ = this.itemListService.getArticles();
  }
}
