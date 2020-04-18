import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { createMockArticleCollectionOfStore } from '../../shared/factory/article';
import { HomePageComponent } from './home-page.component';
import { ItemListService } from '../services/item-list.service';

class MockItemListService implements Partial<ItemListService> {
  getArticles() {
    return of(createMockArticleCollectionOfStore());
  }
}

describe('ItemListComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let itemListService: ItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ItemListService, useClass: MockItemListService }]
    }).compileComponents();

    itemListService = TestBed.get(ItemListService);
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
    spyOn(itemListService, 'getArticles');
    component.ngOnInit();
    expect(itemListService.getArticles).toHaveBeenCalled();
  });
});
