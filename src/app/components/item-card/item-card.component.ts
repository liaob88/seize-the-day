import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ItemListService } from '../../pages/item-list/item-list.service';
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

  getDisplayedDate(article: Article): Date {
    const displayedDate = article.updatedAt
      ? article.updatedAt
      : article.createdAt;
    return displayedDate.toDate();
  }

  delete(id: string) {
    this.itemListService.deletedArticle(id);
  }

  navigateToItemPage(id: number) {
    this.router.navigate([`/articles/${id}`]);
  }

  navigateToEditPage(id: number) {
    this.router.navigate([`/articles/${id}/edit`]);
  }
}
