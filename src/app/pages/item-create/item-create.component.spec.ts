import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemListService } from '../../home/home-page/item-list.service';
import { createFileList } from './../../shared/factory/file';
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
      declarations: [ItemCreateComponent],
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

  it('imageUploaded() が呼ばれると、component.image に受け取った event から取得した image data が格納される', () => {
    const mockEvent: any = {
      target: {
        ['files']: createFileList([
          { body: 'test', mimeType: 'image/jpeg', name: 'test.jpeg' }
        ])
      }
    };
    component.imageUploaded(mockEvent);
    // tslint:disable-next-line: no-string-literal
    expect(component.image).toBe(mockEvent.target['files']);
  });

  describe('onSubmit()', () => {
    it('itemListService の createArticle が呼ばれる', async () => {
      spyOn(itemListService, 'createArticle');
      await component.post();
      expect(itemListService.createArticle).toHaveBeenCalled();
    });
    it('処理後 list ページに飛ぶこと', async () => {
      spyOn(router, 'navigateByUrl');
      await component.post();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/list');
    });
  });
});
