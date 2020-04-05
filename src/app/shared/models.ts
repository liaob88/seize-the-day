export class Item {
  id: number;
  title: string;
  contents: string;
  imageSrc: string;
  createdAt: Date;

  constructor(
    id: number,
    title: string,
    contents: string,
    imageSrc: string,
    createdAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.contents = contents;
    this.imageSrc = imageSrc;
    this.createdAt = createdAt;
  }
}

export class Article {
  title: string;
  contents: string;
  imageSrc: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}

export class ArticleOfStore extends Article {
  id: string;
}

export class ArticleFormValue {
  title: string;
  contents: string;
}
