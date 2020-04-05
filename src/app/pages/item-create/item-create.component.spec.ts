import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { ItemListService } from '../item-list/item-list.service';
import { ItemCreateComponent } from './item-create.component';

class MockItemListService implements Partial<ItemListService> {
  createArticle() {}
}

describe('ItemCreateComponent', () => {
  let component: ItemCreateComponent;
  let fixture: ComponentFixture<ItemCreateComponent>;
  let router: Router;
  let itemListService: MockItemListService;

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

  it('image input に event が走ると、onImageUpload が呼ばれる', () => {
    spyOn(component, 'onImageUpload');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input[type=file]'));
    const event = new Event('change');
    input.nativeElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.onImageUpload).toHaveBeenCalledWith(event);
  });

  describe('onSubmit()', () => {
    it('itemListService の createArticle が呼ばれる', async () => {
      spyOn(itemListService, 'createArticle');
      await component.onSubmit({
        title: 'Test',
        contents: 'Test Test'
      });
      expect(itemListService.createArticle).toHaveBeenCalled();
    });
    it('処理後 list ページに飛ぶこと', async () => {
      spyOn(router, 'navigateByUrl');
      await component.onSubmit({
        title: 'Test',
        contents: 'Test Test'
      });
      expect(router.navigateByUrl).toHaveBeenCalledWith('/list');
    });
  });
});
