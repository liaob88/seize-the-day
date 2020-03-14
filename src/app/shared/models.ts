export class Item {
  id: number;
  title: string;
  contents: string;
  createdAt: Date;

  constructor(id: number, title: string, contents: string, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.contents = contents;
    this.createdAt = createdAt;
  }
}
