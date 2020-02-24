import { ItemListService } from "./item-list.service";
import { Component, OnInit } from "@angular/core";
import { Item } from "../../shared/models";
@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.sass"]
})
export class ItemListComponent implements OnInit {
  title: string;
  items: Item[];

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {
    this.items = this.itemListService.items;
    this.itemListService.addItemEmitter.subscribe(item =>
      this.items.push(item)
    );
    this.itemListService.deleteItemEmitter.subscribe(id => {
      this.items = this.items.filter(item => item.id !== id);
    });
  }

  addItem() {
    const id = this.items[this.items.length - 1].id + 1;
    const title = this.title;
    const createdAt = new Date();
    const newItem = new Item(id, title, createdAt);

    this.itemListService.addedItem(newItem);

    this.title = "";
  }
}
