import { Subject, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { Item } from "../../shared/models";

@Injectable({ providedIn: "root" })
export class ItemListService {
  items: Item[] = [
    new Item(1, "Test 1", new Date("2019/01/01")),
    new Item(2, "Test 2", new Date("2019/01/02")),
    new Item(3, "Test 3", new Date("2019/01/03")),
    new Item(4, "Test 4", new Date("2019/01/04"))
  ];

  itemSub: Subscription;

  addItemEmitter = new Subject<Item>();
  deleteItemEmitter = new Subject<number>();

  addedItem(item: Item) {
    this.addItemEmitter.next(item);
  }

  deletedItem(id: number) {
    this.deleteItemEmitter.next(id);
  }
}
