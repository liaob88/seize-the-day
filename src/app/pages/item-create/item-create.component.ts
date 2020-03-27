import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as marked from 'marked';
import { getUniqueStr } from '../../shared/domains/unique_id_maker';
import { Item, ItemCreateFormValue } from '../../shared/models';
import { ItemListService } from '../item-list/item-list.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemCreateComponent implements OnInit {
  itemCreateForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    image: new FormControl(''),
    contents: new FormControl('')
  });

  imageSrc: string;

  constructor(
    private itemListService: ItemListService,
    private route: Router
  ) {}

  ngOnInit() {}

  onImageUpload(evt) {
    const reader = new FileReader();
    const file = evt.target.files[0];
    reader.onload = e => {
      // tslint:disable-next-line: no-string-literal
      this.imageSrc = e.target['result'];
    };
    reader.readAsDataURL(file);
  }

  async onSubmit(formValue: ItemCreateFormValue) {
    const { title, contents } = formValue;
    const id = getUniqueStr();
    const markedContents = marked(contents);
    const imageSrc = this.imageSrc;
    const createdAt = new Date();

    const newItem = new Item(id, title, markedContents, imageSrc, createdAt);
    await this.itemListService.addedItem(newItem);

    this.route.navigateByUrl('/list');
  }
}
