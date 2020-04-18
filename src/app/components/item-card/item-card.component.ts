import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ItemListService } from '../../home/item-list/item-list.service';
import { Article, ArticleOfStore } from './../../shared/models';

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
  articles: ArticleOfStore[];

  getDateString(article: ArticleOfStore): Date {
    const displayedDate = article.updatedAt
      ? article.updatedAt
      : article.createdAt;
    return displayedDate.toDate();
  }

  deleteArticle(id: string) {
    this.itemListService.delete(id);
  }

  navigateToItemPage(id: string) {
    this.router.navigateByUrl(`/articles/${id}`);
  }

  navigateToEditPage(id: string) {
    this.router.navigateByUrl(`/articles/${id}/edit`);
  }
}
