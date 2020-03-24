import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { ItemListService } from '../../pages/item-list/item-list.service';
import { ItemsStoreState } from './../../store/store';
import { ItemCardComponent } from './item-card.component';

class MockItemListService implements Partial<ItemListService> {
  itemsStoreState$ = new BehaviorSubject<ItemsStoreState>(null);
  deletedItem() {}
}

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;
  let router: Router;
  let itemListService: MockItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [{ provide: ItemListService, useClass: MockItemListService }]
    }).compileComponents();

    router = TestBed.get(Router);
    itemListService = TestBed.get(ItemListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete() called', () => {
    spyOn(itemListService, 'deletedItem');
    component.delete(3);
    fixture.detectChanges();

    expect(itemListService.deletedItem).toHaveBeenCalledWith(3);
  });

  it('navigateToItemPage() が呼ばれると、指定された id を持つ item のページに遷移すること', () => {
    spyOn(router, 'navigate');
    component.navigateToItemPage(3);
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/item/3']);
  });

  it('navigateToEditPage() が呼ばれると、指定された id を持つ item の編集ページに遷移すること', () => {
    spyOn(router, 'navigate');
    component.navigateToEditPage(3);
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/item/3/edit']);
  });
});
