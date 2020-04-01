import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticleFormValue } from '../../shared/models';
import { ItemListService } from '../item-list/item-list.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {
  id: string;
  image: any = null;
  previewImageSrc: string = '';
  hasImageEditted: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private itemListService: ItemListService,
    private route: Router
  ) {}

  formValue: FormGroup = this.fb.group({
    title: [''],
    contents: ['']
  });

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');

      this.itemListService.getArticle(this.id).subscribe(article => {
        this.formValue.patchValue({
          title: article.title,
          contents: article.contents
        });
        this.previewImageSrc = article.imageSrc;
      });
    });
  }

  onImageUpload(event: Event): void {
    // submit 用
    this.image = event.target['files'];

    // preview 用
    const reader = new FileReader();
    reader.onload = e => {
      this.previewImageSrc = e.target['result'];
    };
    reader.readAsDataURL(event.target['files'][0]);
  }

  async onSubmit(formValue: ArticleFormValue) {
    if (this.hasImageEditted) {
      await this.itemListService.updateArticle(this.id, formValue, this.image);
    }
    if (!this.hasImageEditted) {
      await this.itemListService.updateArticle(this.id, formValue);
    }
    this.route.navigateByUrl('/list');
  }
}
