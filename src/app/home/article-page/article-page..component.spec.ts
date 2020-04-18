import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { createMockArticleDocOfStore } from 'src/app/shared/factory/article';
import { ArticleService } from '../../shared/services/article.service';
import { ArticlePageComponent } from './article-page.component';

class MockArticleService implements Partial<ArticleService> {
  getArticle(id: string) {
    return of(createMockArticleDocOfStore());
  }
}

describe('ItemComponent', () => {
  let component: ArticlePageComponent;
  let fixture: ComponentFixture<ArticlePageComponent>;
  let articleService: MockArticleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlePageComponent],
      providers: [
        { provide: ArticleService, useClass: MockArticleService },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '1' })) }
        }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();

    articleService = TestBed.get(ArticleService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('component.id を引数として articleService の getArticle が呼ばれる', () => {
      spyOn(articleService, 'getArticle');
      component.ngOnInit();
      expect(articleService.getArticle).toHaveBeenCalledWith('1');
    });
  });
});
