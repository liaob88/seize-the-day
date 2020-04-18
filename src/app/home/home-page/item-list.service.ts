import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as marked from 'marked';
import { Observable } from 'rxjs';
import { Article, ArticleFormValue } from '../../shared/models';
import { ArticleOfStore } from '../../shared/models';
import { FirebaseService } from '../../shared/services/firebase.service';

@Injectable({ providedIn: 'root' })
export class ItemListService {
  private readonly collectionName = 'articles';
  constructor(private firebaseService: FirebaseService) {}

  getArticle(id: string): Observable<ArticleOfStore> {
    return this.firebaseService.getDoc<ArticleOfStore>(id, this.collectionName);
  }

  // MEMO: observable の変数に置き換えられそう
  getArticles(): Observable<ArticleOfStore[]> {
    return this.firebaseService.getCollection<ArticleOfStore>(
      this.collectionName
    );
  }

  createArticle(article: ArticleFormValue, image: FileList): void {
    const { title, contents } = article;
    const markedContents = marked(contents);
    const createdAt = firebase.firestore.Timestamp.fromDate(new Date());

    // tslint:disable-next-line: no-string-literal
    const filePath = `/article_thumbnails/${image[0]['name']}`;

    this.firebaseService.uploadToStorage(filePath, image[0]).then(() => {
      this.firebaseService.getDLUrl(filePath).subscribe(url =>
        this.firebaseService.createDoc<Article>(this.collectionName, {
          title,
          contents: markedContents,
          imageSrc: url,
          createdAt
        })
      );
    });
  }

  updateArticle(id: string, article: ArticleFormValue, image?: FileList): void {
    const { title, contents } = article;
    const markedContents = marked(contents);
    const updatedAt = firebase.firestore.Timestamp.fromDate(new Date());

    // サムネイルが更新されない場合は、store の更新のみ
    if (!image) {
      this.firebaseService.updateDoc<Article>(this.collectionName, id, {
        contents: markedContents,
        title,
        updatedAt
      });
      return;
    }

    const filePath = `/article_thumbnails/${image[0].name}`;
    this.firebaseService.uploadToStorage(filePath, image[0]).then(() =>
      this.firebaseService.getDLUrl(filePath).subscribe(url =>
        this.firebaseService.updateDoc<Article>(this.collectionName, id, {
          contents: markedContents,
          title,
          imageSrc: url,
          updatedAt
        })
      )
    );
  }

  delete(id: string) {
    this.firebaseService.deleteDoc(this.collectionName, id);
  }
}
