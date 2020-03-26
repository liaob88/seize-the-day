import { createMockLongContentsItem } from 'src/app/shared/factory/item';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Item } from 'src/app/shared/models';
import { ItemsStoreState } from '../../store/store';
import { ItemListComponent } from './item-list.component';
import { ItemListService } from './item-list.service';

class MockItemListService implements Partial<ItemListService> {
  itemsStoreState$ = new BehaviorSubject<ItemsStoreState>(null);
}

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let itemListService: MockItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ItemListService, useClass: MockItemListService }]
    }).compileComponents();

    itemListService = TestBed.get(ItemListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('itemsStoreState$', () => {
    it('default', () => {
      component.itemsStoreState$.subscribe(itemsStoreState => {
        expect(itemsStoreState).toBe(null);
      });
    });

    it('itemListService の itemsStoreState$ が更新された時、component 側の itemsStoreState$ が更新されること', () => {
      const newState = {
        items: [createMockLongContentsItem({})]
      };

      itemListService.itemsStoreState$.next(newState);
      fixture.detectChanges();

      component.itemsStoreState$.subscribe(itemsStoreState =>
        expect(itemsStoreState).toBe(newState)
      );
    });
  });
});
