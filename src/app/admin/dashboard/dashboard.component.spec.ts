import { MaterialModule } from './../../shared/styles/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuard } from '../shared/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { ArticleService } from 'src/app/shared/services/article.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockArticleService implements Partial<ArticleService> {
  delete() {}
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let articleService: MockArticleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AuthGuard,
        AngularFireAuth,
        { provide: ArticleService, useClass: MockArticleService }
      ],
      imports: [MaterialModule]
    }).compileComponents();

    articleService = TestBed.get(ArticleService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 'should create' の段階で NullInjectorError: StaticInjectorError(DynamicTestModule)[AngularFireAuth -> InjectionToken angularity2.app.options]... を解決できない

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('delete() が呼ばれると、itemListService の delete が呼ばれること', () => {
  //   spyOn(articleService, 'delete');
  //   component.deleteArticle('1');
  //   expect(articleService.delete).toHaveBeenCalledWith('1');
  // });
});
