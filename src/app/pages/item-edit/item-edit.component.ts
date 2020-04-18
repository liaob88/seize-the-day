import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemListService } from '../../home/home-page/item-list.service';
import { ArticleOfStore } from './../../shared/models';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {
  id: string;
  image: FileList = null;
  previewImageSrc: string;
  hasImageEdited: boolean = false;
  article$: Observable<ArticleOfStore>;
  hasValueSet: boolean;
  imageSrc: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private itemListService: ItemListService,
    private route: Router
  ) {}

  formValue: FormGroup = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    contents: this.fb.control('', [Validators.required])
  });

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.itemListService.getArticle(this.id).subscribe(article => {
        this.formValue.setValue({
          title: `# ${article.title}`,
          contents: article.contents
        });
        this.imageSrc = article.imageSrc;
        this.hasValueSet = true;
      });
    });
  }

  patchFormValue(article: ArticleOfStore) {
    this.formValue.patchValue({
      title: article.title,
      contents: article.contents
    });
    return this.formValue;
  }

  onImageUpload(event: Event): void {
    console.log(event);

    this.hasImageEdited = true;
    // tslint:disable-next-line: no-string-literal
    this.image = event.target['files'];
  }

  async onSubmit() {
    if (this.hasImageEdited) {
      await this.itemListService.updateArticle(
        this.id,
        this.formValue.value,
        this.image
      );
    }
    if (!this.hasImageEdited) {
      await this.itemListService.updateArticle(this.id, this.formValue.value);
    }
    this.route.navigateByUrl('/list');
  }
}
