import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article, ArticleOfStore } from '../../models';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  constructor(private router: Router, private articleService: ArticleService) {}
  @Input()
  articles: ArticleOfStore[];

  getDateString(article: ArticleOfStore): Date {
    const displayedDate = article.updatedAt
      ? article.updatedAt
      : article.createdAt;
    return displayedDate.toDate();
  }

  navigateToItemPage(id: string) {
    this.router.navigateByUrl(`/articles/${id}`);
  }
}
