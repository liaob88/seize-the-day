import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { EditorComponent } from './editor.component';

@Component({
  template: `
    <app-editor [subForm]="formValue"></app-editor>
  `
})
class TestComponent {
  constructor(private fb: FormBuilder) {}
  formValue: FormGroup = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    contents: this.fb.control('', [Validators.required])
  });
}

describe('EditorComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let hostComponent: TestComponent;
  let component: EditorComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorComponent, TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(EditorComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form validation', () => {
    describe('formGroup', () => {
      it('初期状態 or 必須項目が入力されない場合は formGroup.invalid が true になる', () => {
        expect(component.subForm.invalid).toBeTruthy();
      });
      it('必須項目が入力されると、formGroup.invalid が false になる', () => {
        component.subForm.patchValue({
          title: '入力あり',
          contents: '入力あり'
        });
        expect(component.subForm.invalid).toBeFalsy();
      });
    });

    describe('required validation', () => {
      describe('title', () => {
        it('title がある時は error 無し', () => {
          component.subForm.patchValue({ title: '入力あり' });
          expect(component.subForm.controls.title.errors).toBeNull();
        });

        it('title がない時は error 有り', () => {
          component.subForm.patchValue({ title: '' });
          expect(component.subForm.controls.title.errors).toBeTruthy();
        });
      });

      describe('content', () => {
        it('control がある時は error 無し', () => {
          component.subForm.patchValue({ contents: '入力あり' });
          expect(component.subForm.controls.contents.errors).toBeNull();
        });

        it('control がない時は error 有り', () => {
          component.subForm.patchValue({ contents: '' });
          expect(component.subForm.controls.contents.errors).toBeTruthy();
        });
      });
    });
  });

  it('onImageUpload() が呼ばれると、imageUpload が emit される', () => {
    spyOn(component.imageUpload, 'emit');

    const input = fixture.debugElement.query(By.css('input[type=file]'));
    const event = new Event('change');
    input.nativeElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.imageUpload.emit).toHaveBeenCalledWith(event);
  });

  it('onSubmit() が呼ばれると、submitted が emit される', () => {
    spyOn(component.submitted, 'emit');
    component.onSubmit();
    expect(component.submitted.emit).toHaveBeenCalled();
  });
});
