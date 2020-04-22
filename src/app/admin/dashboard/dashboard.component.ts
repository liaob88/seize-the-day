import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleOfStore } from './../../shared/models';
import { ArticleService } from './../../shared/services/article.service';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private articleService: ArticleService
  ) {}
  articles$: Observable<ArticleOfStore[]> = this.articleService.getArticles();
  dataSource;
  displayedColumns: string[] = [
    'position',
    'title',
    'image',
    'created_at',
    'updated_at'
  ];

  ngOnInit() {}

  logOut() {
    this.auth.signOut();
  }
}
