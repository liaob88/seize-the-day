import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { createMockLongContentsItem } from 'src/app/shared/factory/item';
import { Item } from 'src/app/shared/models';
import { ItemListComponent } from './item-list.component';
import { ItemListService } from './item-list.service';

class MockItemListService implements Partial<ItemListService> {
  items$ = new BehaviorSubject<Item[]>(null);
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

  describe('items$', () => {
    it('default', () => {
      component.items$.subscribe(items => {
        expect(items).toBe(null);
      });
    });

    it('itemListService の items$ が更新された時、component 側の items$ が更新されること', () => {
      const newState = {
        items: [createMockLongContentsItem({})]
      };

      //TODO: createMockLongContentsItem の型を変えて、items のみ渡せるようにする
      itemListService.items$.next(newState.items);
      fixture.detectChanges();

      component.items$.subscribe(items => expect(items).toBe(newState.items));
    });
  });
});
