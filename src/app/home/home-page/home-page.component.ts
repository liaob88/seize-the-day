import { ArticleService } from '../../shared/services/article.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleOfStore } from '../../shared/models';

@Component({
  selector: 'app-item-list',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  articles$: Observable<ArticleOfStore[]>;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articles$ = this.articleService.getArticles();
  }
}
