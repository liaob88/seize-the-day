import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticleService } from '../../shared/services/article.service';
import { createFileList } from '../../shared/factory/file';
import { CreatePageComponent } from './create-page.component';

class MockArticleService implements Partial<ArticleService> {
  createArticle() {}
}

describe('ItemCreateComponent', () => {
  let component: CreatePageComponent;
  let fixture: ComponentFixture<CreatePageComponent>;
  let router: Router;
  let articleService: MockArticleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePageComponent],
      providers: [{ provide: ArticleService, useClass: MockArticleService }],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, ReactiveFormsModule]
    }).compileComponents();

    router = TestBed.get(Router);
    articleService = TestBed.get(ArticleService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePageComponent);
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
    it('articleService の createArticle が呼ばれる', async () => {
      spyOn(articleService, 'createArticle');
      await component.post();
      expect(articleService.createArticle).toHaveBeenCalled();
    });
    it('処理後 list ページに飛ぶこと', async () => {
      spyOn(router, 'navigateByUrl');
      await component.post();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/admin/dashboard');
    });
  });
});
