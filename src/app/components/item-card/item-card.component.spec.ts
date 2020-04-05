import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  createMockArticleCollectionOfStore,
  mockArticleDocOfStore
} from '../../shared/factory/article';
import { ItemListService } from '../../pages/item-list/item-list.service';
import { ArticleOfStore } from './../../shared/models';
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

class MockItemListService implements Partial<ItemListService> {
  delete() {}
}

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let hostComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let router: Router;
  let itemListService: MockItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCardComponent, TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [{ provide: ItemListService, useClass: MockItemListService }]
    }).compileComponents();

    router = TestBed.get(Router);
    itemListService = TestBed.get(ItemListService);
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
    spyOn(itemListService, 'delete');
    component.deleteArticle('1');
    expect(itemListService.delete).toHaveBeenCalledWith('1');
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
