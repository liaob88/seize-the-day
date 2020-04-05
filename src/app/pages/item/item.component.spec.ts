import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { createMockArticleDocOfStore } from 'src/app/shared/factory/article';
import { ItemListService } from '../item-list/item-list.service';
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

  describe('ngOnInit()', () => {
    it('component.id を引数として itemListService の getArticle が呼ばれる', () => {
      spyOn(itemListService, 'getArticle');
      component.ngOnInit();
      expect(itemListService.getArticle).toHaveBeenCalledWith('1');
    });
  });
});
