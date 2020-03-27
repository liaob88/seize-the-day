import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ItemListService } from '../item-list/item-list.service';
import { createMockLongContentsItem } from './../../shared/factory/item';
import { ItemsStoreState } from './../../store/store';
import { ItemComponent } from './item.component';

class MockItemListService implements Partial<ItemListService> {
  itemsStoreState$ = new BehaviorSubject<ItemsStoreState>(null);
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
          useValue: { paramMap: of(convertToParamMap({ id: 1 })) }
        }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();

    itemListService = TestBed.get(ItemListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    itemListService.itemsStoreState$.next({
      items: [createMockLongContentsItem({})]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('current url に沿って正しい item が component.item に代入されること', () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.item.id).toBe(1);
  });
});
