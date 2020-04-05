import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MarkdownPipe } from 'src/app/shared/pipes/markdown.pipe';
import { EditorComponent } from './editor.component';

@Component({
  template: `
    <app-editor [subForm]="formValue"></app-editor>
  `
})
class TestComponent {
  constructor(private fb: FormBuilder) {}
  formValue: FormGroup = this.fb.group({
    title: [''],
    contents: ['']
  });
}

describe('EditorComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let hostComponent: TestComponent;
  let component: EditorComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorComponent, MarkdownPipe, TestComponent],
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

  it('onImageUpload() が呼ばれると、imageUpload が emit される', () => {
    spyOn(component.imageUpload, 'emit');

    const input = fixture.debugElement.query(By.css('input[type=file]'));
    const event = new Event('change');
    input.nativeElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.imageUpload.emit).toHaveBeenCalledWith(event);
  });
});
