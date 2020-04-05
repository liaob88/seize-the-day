import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { createMockArticleDocOfStore } from 'src/app/shared/factory/article';
import { createFileList } from 'src/app/shared/factory/file';
import { ItemListService } from '../item-list/item-list.service';
import { EditorComponent } from './../../components/editor/editor.component';
import { MarkdownPipe } from './../../shared/pipes/markdown.pipe';
import { ItemEditComponent } from './item-edit.component';

class MockItemListService implements Partial<ItemListService> {
  getArticle(id: string) {
    return of(createMockArticleDocOfStore({}));
  }
  updateArticle() {}
}

describe('ItemEditComponent', () => {
  let component: ItemEditComponent;
  let fixture: ComponentFixture<ItemEditComponent>;
  let itemListService: MockItemListService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemEditComponent, MarkdownPipe, EditorComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: ItemListService, useClass: MockItemListService },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '1' })) }
        }
      ]
    }).compileComponents();

    itemListService = TestBed.get(ItemListService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit() が呼ばれると', () => {
    it('url に従って適切な値が component.id に代入される', () => {
      component.ngOnInit();
      expect(component.id).toBe('1');
    });

    it('itemListService.getArticle が component.id を引数にして呼び出され、component.articles$ にその結果が入る', () => {
      spyOn(itemListService, 'getArticle');
      component.ngOnInit();
      expect(itemListService.getArticle).toHaveBeenCalledWith('1');
      expect(component.article$).toBe(itemListService.getArticle('1'));
    });
  });

  it('onImageUpload() が呼ばれると、hasImageEdited が true になり、指定された image が component.image に入れられる', () => {
    const mockEvent: any = {
      target: {
        ['files']: createFileList([
          { body: 'test', mimeType: 'image/jpeg', name: 'test.jpeg' }
        ])
      }
    };
    component.onImageUpload(mockEvent as any);

    expect(component.hasImageEdited).toBe(true);
    // tslint:disable-next-line: no-string-literal
    expect(component.image).toBe(mockEvent.target['files']);
  });

  describe('onSubmit() が呼ばれると、', () => {
    describe('itemListService の updateArticle の引数について', () => {
      it('hasImageEdited が true の場合、id, formValue, image が渡される', async () => {
        spyOn(itemListService, 'updateArticle');
        component.id = '1';
        component.image = createFileList([
          { body: 'test', mimeType: 'image/jpeg', name: 'test.jpeg' }
        ]);
        component.hasImageEdited = true;
        fixture.detectChanges();
        await component.onSubmit();
        expect(itemListService.updateArticle).toHaveBeenCalledWith(
          component.id,
          component.formValue.value,
          component.image
        );
      });

      it('hasImageEdited が false の場合、id, image が渡される', async () => {
        spyOn(itemListService, 'updateArticle');
        component.hasImageEdited = false;
        component.onSubmit();
        expect(itemListService.updateArticle).toHaveBeenCalledWith(
          component.id,
          component.formValue.value
        );
      });
    });

    it('ホームに遷移すること', async () => {
      spyOn(router, 'navigateByUrl');
      await component.onSubmit();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/list');
    });
  });
});
