import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../shared/services/article.service';
import { ArticleOfStore } from '../../shared/models';

@Component({
  selector: 'app-item',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  item$: Observable<ArticleOfStore>;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.item$ = this.articleService.getArticle(id);
    });
  }
}
