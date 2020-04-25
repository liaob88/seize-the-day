import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { createMockArticleDocOfStore } from 'src/app/shared/factory/article';
import { createFileList } from 'src/app/shared/factory/file';
import { ArticleService } from '../../shared/services/article.service';
import { EditorComponent } from '../shared/components/editor/editor.component';
import { EditPageComponent } from './edit-page.component';

class MockArticleService implements Partial<ArticleService> {
  getArticle(id: string) {
    return of(createMockArticleDocOfStore({}));
  }
  updateArticle() {}
}

describe('ItemEditComponent', () => {
  let component: EditPageComponent;
  let fixture: ComponentFixture<EditPageComponent>;
  let articleService: MockArticleService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPageComponent, EditorComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: ArticleService, useClass: MockArticleService },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '1' })) }
        }
      ]
    }).compileComponents();

    articleService = TestBed.get(ArticleService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPageComponent);
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

    it('articleService.getArticle が component.id を引数にして呼び出され、component.articles$ にその結果が入る', () => {
      spyOn(articleService, 'getArticle');
      component.ngOnInit();
      expect(articleService.getArticle).toHaveBeenCalledWith('1');
      expect(component.article$).toBe(articleService.getArticle('1'));
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
    describe('articleService の updateArticle の引数について', () => {
      it('hasImageEdited が true の場合、id, formValue, image が渡される', async () => {
        spyOn(articleService, 'updateArticle');
        component.id = '1';
        component.image = createFileList([
          { body: 'test', mimeType: 'image/jpeg', name: 'test.jpeg' }
        ]);
        component.hasImageEdited = true;
        fixture.detectChanges();
        await component.onSubmit();
        expect(articleService.updateArticle).toHaveBeenCalledWith(
          component.id,
          component.formValue.value,
          component.image
        );
      });

      it('hasImageEdited が false の場合、id, image が渡される', async () => {
        spyOn(articleService, 'updateArticle');
        component.hasImageEdited = false;
        component.onSubmit();
        expect(articleService.updateArticle).toHaveBeenCalledWith(
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
