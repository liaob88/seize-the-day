export class Item {
  id: number;
  title: string;
  createdAt: string | Date;

  constructor(id: number, title: string, createdAt: string | Date) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
  }
}
