import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ArticleOfStore } from './../../shared/models';
import { ArticleService } from './../../shared/services/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  articles$: Observable<ArticleOfStore[]>;
  displayedColumns: string[] = [
    'position',
    'title',
    'image',
    'created_at',
    'updated_at',
    'edit',
    'delete'
  ];

  ngOnInit() {
    this.articles$ = this.articleService.getArticles();
  }

  logOut() {
    this.auth.signOut();
  }

  deleteArticle(id: string) {
    this.articleService.delete(id);
  }

  navigateToEditPage(id: string) {
    this.router.navigateByUrl(`admin/${id}/edit`);
  }
}
