import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  @Input()
  subForm: FormGroup;
  @Output()
  imageUpload = new EventEmitter<Event>();
  @Output()
  submitted = new EventEmitter<Event>();

  previewImageSrc: string;

  constructor() {}

  onImageUpload(event: Event): void {
    // hostComponent に image を emit
    this.imageUpload.emit(event);

    // previewImageSrc 用
    const reader = new FileReader();
    reader.onload = e => {
      // tslint:disable-next-line: no-string-literal
      this.previewImageSrc = e.target['result'];
    };
    // tslint:disable-next-line: no-string-literal
    reader.readAsDataURL(event.target['files'][0]);
  }

  onSubmit(): void {
    this.submitted.emit();
  }
}
