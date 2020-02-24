export class Item {
  id: number;
  title: string;
  createdAt: Date;

  constructor(id: number, title: string, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
  }
}
