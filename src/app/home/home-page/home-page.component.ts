import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleOfStore } from '../../shared/models';
import { ItemListService } from '../services/item-list.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  articles$: Observable<ArticleOfStore[]>;

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {
    this.articles$ = this.itemListService.getArticles();
  }
}
