import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { createMockArticleCollectionOfStore } from '../../shared/factory/article';
import { ArticleService } from '../../shared/services/article.service';
import { HomePageComponent } from './home-page.component';

class MockArticleService implements Partial<ArticleService> {
  getArticles() {
    return of(createMockArticleCollectionOfStore());
  }
}

describe('ItemListComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let articleService: ArticleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ArticleService, useClass: MockArticleService }]
    }).compileComponents();

    articleService = TestBed.get(ArticleService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() が呼ばれると、itemListService の getArticles が呼ばれること', () => {
    spyOn(articleService, 'getArticles');
    component.ngOnInit();
    expect(articleService.getArticles).toHaveBeenCalled();
  });
});
