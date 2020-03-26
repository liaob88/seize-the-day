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

export class ItemCreateFormValue {
  title: string;
  contents: string;
  imageSrc: string;
}
