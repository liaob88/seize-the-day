import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Store } from '@ngrx/store';
import * as marked from 'marked';
import { Observable } from 'rxjs';
import { getUniqueId } from '../../shared/domains/unique_id_maker';
import { Article, ArticleFormValue, Item } from '../../shared/models';
import { actions, featureName, ItemsStoreState } from '../../store/store';

@Injectable({ providedIn: 'root' })
export class ItemListService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  readonly items$: Observable<Item[]>;

  constructor(
    private store$: Store<{ [featureName]: ItemsStoreState }>,
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.itemsCollection = this.db.collection<Item>('articles');
    this.items$ = this.itemsCollection.valueChanges();
  }

  readonly itemsStoreState$: Observable<ItemsStoreState> = this.store$.select(
    featureName
  );

  async createArticle(article: ArticleFormValue, image: any) {
    const { title, contents } = article;
    const articleId = getUniqueId();
    const markedContents = marked(contents);
    const createdAt = new Date();

    const filePath = `/article_thumbnails/${image[0]['name']}`;
    this.storage.upload(filePath, image[0]).then(() => {
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe(url =>
          this.db.collection<Article>('articles').add({
            id: articleId,
            title,
            contents: markedContents,
            imageSrc: url,
            createdAt
          })
        );
    });
  }

  addedItem(item: Item) {
    this.store$.dispatch(actions.createItem({ item }));
  }

  deletedItem(id: number) {
    this.store$.dispatch(actions.deleteItem({ id }));
  }

  updatedItem(item: Item) {
    this.store$.dispatch(actions.updateItem({ item }));
  }
}
