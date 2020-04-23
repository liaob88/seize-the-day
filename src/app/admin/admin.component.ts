import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleOfStore } from '../shared/models';
import { ArticleService } from '../shared/services/article.service';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}
  parameter: string;
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
