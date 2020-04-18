import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  createMockArticleCollectionOfStore,
  mockArticleDocOfStore
} from '../../factory/article';
import { ArticleService } from '../../services/article.service';
import { ArticleOfStore } from '../../models';
import { ItemCardComponent } from './item-card.component';
import * as firebase from 'firebase';

@Component({
  template: `
    <app-item-card [articles]="articles"></app-item-card>
  `
})
class TestComponent {
  articles: ArticleOfStore[];
}

class MockArticleService implements Partial<ArticleService> {
  delete() {}
}

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let hostComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let router: Router;
  let articleService: MockArticleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCardComponent, TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [{ provide: ArticleService, useClass: MockArticleService }]
    }).compileComponents();

    router = TestBed.get(Router);
    articleService = TestBed.get(ArticleService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    hostComponent = fixture.componentInstance;
    // tslint:disable-next-line: no-non-null-assertion
    component = fixture.debugElement.query(By.directive(ItemCardComponent))!
      .componentInstance;
    hostComponent.articles = createMockArticleCollectionOfStore();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.articles.length).toBe(2);
  });

  it('getDateString() called', () => {
    const updatedArticle = {
      ...mockArticleDocOfStore,
      updatedAt: firebase.firestore.Timestamp.fromDate(new Date('2020-01-01'))
    };
    const result = component.getDateString(updatedArticle);
    expect(result).toEqual(updatedArticle.updatedAt.toDate());
  });

  it('delete() が呼ばれると、itemListService の delete が呼ばれること', () => {
    spyOn(articleService, 'delete');
    component.deleteArticle('1');
    expect(articleService.delete).toHaveBeenCalledWith('1');
  });

  it('navigateToItemPage() が呼ばれると、指定された id を持つ item のページに遷移すること', () => {
    spyOn(router, 'navigateByUrl');
    component.navigateToItemPage('3');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/articles/3');
  });

  it('navigateToEditPage() が呼ばれると、指定された id を持つ item の編集ページに遷移すること', () => {
    spyOn(router, 'navigateByUrl');
    component.navigateToEditPage('3');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/articles/3/edit');
  });
});
