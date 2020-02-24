import { Component, OnInit } from "@angular/core";
import { Item } from "../../shared/models";
@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.sass"]
})
export class ItemListComponent implements OnInit {
  title: string;
  items: Item[] = [
    new Item(1, "Test 1", "2019-01-01"),
    new Item(2, "Test 2", "2019-01-02"),
    new Item(3, "Test 3", "2019-01-03"),
    new Item(4, "Test 4", "2019-01-04")
  ];

  constructor() {}

  ngOnInit() {}

  addItem() {
    const id = this.items[this.items.length - 1].id + 1;
    const createdAt = new Date();
    const newItem = new Item(id, this.title, createdAt);
    this.items.push(newItem);
    this.title = "";
  }
}
