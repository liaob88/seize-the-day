import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() subForm: FormGroup;
  // MEMO: edit ページで呼び出された時に、対象記事内のすでに存在している imageSrc を格納
  @Input() imageSrc?: string;
  @Output() imageUpload = new EventEmitter<Event>();
  @Output() submitted = new EventEmitter<Event>();
  previewImageSrc: string;

  ngOnInit() {
    // MEMO: create 時と edit 時で previewImageSrc に入れる値が異なる
    this.previewImageSrc = this.imageSrc ? this.imageSrc : '';
  }

  constructor() {}

  get formControls() {
    return this.subForm.controls;
  }

  onImageUpload(event: Event): void {
    // hostComponent に image data を emit
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
