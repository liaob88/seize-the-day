import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ItemListService } from '../item-list/item-list.service';
import { ItemCreateComponent } from './item-create.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ItemCreateComponent', () => {
  let component: ItemCreateComponent;
  let fixture: ComponentFixture<ItemCreateComponent>;
  let router: Router;
  let itemListService: ItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCreateComponent, MarkdownPipe],
      providers: [
        { provide: itemListService, useClass: ItemListService },
        provideMockStore({})
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, StoreModule]
    }).compileComponents();

    router = TestBed.get(Router);
    itemListService = TestBed.get(ItemListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() が呼ばれると、component.title が空文字になること', () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.title).toBe('');
  });

  it('addItem() が呼ばれると、itemListService の addedItem が呼ばれ、その後 index ページに飛ぶこと', async () => {
    spyOn(itemListService, 'addedItem');
    spyOn(router, 'navigateByUrl');

    await component.addItem();

    expect(itemListService.addedItem).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/list');
  });
});
