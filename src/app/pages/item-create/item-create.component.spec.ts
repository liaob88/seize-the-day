import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemCreateFormValue } from '../../shared/models';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { ItemListService } from '../item-list/item-list.service';
import { ItemCreateComponent } from './item-create.component';

class MockItemListService implements Partial<ItemListService> {
  addedItem() {}
}

describe('ItemCreateComponent', () => {
  let component: ItemCreateComponent;
  let fixture: ComponentFixture<ItemCreateComponent>;
  let router: Router;
  let itemListService: ItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCreateComponent, MarkdownPipe],
      providers: [{ provide: ItemListService, useClass: MockItemListService }],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, ReactiveFormsModule]
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

  it('onSubmit() が呼ばれると、itemListService の addedItem が呼ばれ、その後 index ページに飛ぶこと', async () => {
    // onSubmit が引数が必要なので mockFormData を作成
    const mockFormData: ItemCreateFormValue = {
      title: 'abc',
      contents: '123'
    };
    spyOn(itemListService, 'addedItem');
    spyOn(router, 'navigateByUrl');

    await component.onSubmit(mockFormData);

    expect(itemListService.addedItem).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/list');
  });
});
