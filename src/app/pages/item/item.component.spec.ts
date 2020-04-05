import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { createMockArticleDocOfStore } from 'src/app/shared/factory/article';
import { ItemListService } from '../item-list/item-list.service';
import { createMockFirestoreItem } from './../../shared/factory/item';
import { ItemComponent } from './item.component';

class MockItemListService implements Partial<ItemListService> {
  getArticle(id: string) {
    return of(createMockArticleDocOfStore());
  }
}

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let itemListService: MockItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent],
      providers: [
        { provide: ItemListService, useClass: MockItemListService },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '1' })) }
        }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();

    itemListService = TestBed.get(ItemListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() が呼ばれると、current url に沿って正しい item が component.item に代入されること', () => {
    spyOn(itemListService, 'getArticle');
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.item.id).toBe('1');
    expect(itemListService.getArticle).toHaveBeenCalledWith('1');
  });
});
