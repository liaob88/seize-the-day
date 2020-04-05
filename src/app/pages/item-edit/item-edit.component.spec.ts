import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {
  createMockArticleDocOfStore,
  mockArticleDocOfStore
} from 'src/app/shared/factory/article';
import { ItemListService } from '../item-list/item-list.service';
import { MarkdownPipe } from './../../shared/pipes/markdown.pipe';
import { ItemEditComponent } from './item-edit.component';
import { By } from '@angular/platform-browser';

interface MockFile {
  name: string;
  body: string;
  mimeType: string;
}

const createFileFromMockFile = (file: MockFile): File => {
  const blob = new Blob([file.body], { type: file.mimeType }) as any;
  // tslint:disable-next-line: no-string-literal
  blob['lastModifiedDate'] = new Date();
  // tslint:disable-next-line: no-string-literal
  blob['name'] = file.name;
  return blob as File;
};

const createFileList = (files: MockFile[]) => {
  const fileList: FileList = {
    length: files.length,
    item(index: number): File {
      return fileList[index];
    }
  };
  files.forEach((file, index) => {
    fileList[index] = createFileFromMockFile(file);
  });

  return fileList;
};

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
      declarations: [ItemEditComponent, MarkdownPipe],
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
    // itemListService.getArticle が呼ばれていることを確認しようとすると、エラーが起きるので一旦見送り
    it('取得した Article の value が、コンポーネントの対応する value に代入されること', () => {
      expect(component.formValue.value.title).toBe(mockArticleDocOfStore.title);
      expect(component.formValue.value.contents).toBe(
        mockArticleDocOfStore.contents
      );
    });
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

  describe('onSubmit() が呼ばれる', () => {
    it('component.image に value がある場合', async () => {
      spyOn(itemListService, 'updateArticle');

      component.id = '1';
      component.image = createFileList([
        { body: 'test', mimeType: 'text/plain', name: 'test.txt' }
      ]);
      component.hasImageEditted = true;
      fixture.detectChanges();

      await component.onSubmit(component.formValue.value);
      expect(itemListService.updateArticle).toHaveBeenCalledWith(
        component.id,
        component.formValue.value,
        component.image
      );
    });

    it('ホームに遷移すること', async () => {
      spyOn(router, 'navigateByUrl');
      await component.onSubmit(component.formValue.value);

      expect(router.navigateByUrl).toHaveBeenCalledWith('/list');
    });
  });
});
