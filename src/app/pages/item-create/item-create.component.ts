import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../../shared/services/article.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemCreateComponent implements OnInit {
  // MEMO: default 画像ができたらここに URL を用意
  image: FileList = null;
  previewImageSrc: string;

  formValue: FormGroup = this.fb.group({
    title: this.fb.control('# ', [Validators.required]),
    contents: this.fb.control('', [Validators.required])
  });

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private route: Router
  ) {}

  ngOnInit() {}

  imageUploaded(event: Event): void {
    // tslint:disable-next-line: no-string-literal
    this.image = event.target['files'];
  }

  async post() {
    await this.articleService.createArticle(this.formValue.value, this.image);
    this.route.navigateByUrl('/list');
  }
}
