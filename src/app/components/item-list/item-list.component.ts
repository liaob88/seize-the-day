import { Item } from "./../../shared/models";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.sass"]
})
export class ItemListComponent implements OnInit {
  title: string;
  items: Item[] = [
    {
      id: 1,
      title: "Test 1",
      createdAt: "2019-01-01"
    },
    {
      id: 2,
      title: "Test 2",
      createdAt: "2019-01-02"
    },
    {
      id: 3,
      title: "Test 3",
      createdAt: "2019-01-03"
    },
    {
      id: 4,
      title: "Test 4",
      createdAt: "2019-01-04"
    }
  ];

  constructor() {}

  ngOnInit() {}

  addItem() {
    const id = this.items[this.items.length - 1].id + 1;
    const createdAt = new Date();
    const newToDo = new Item(id, this.title, createdAt);
    this.items.push(newToDo);
    this.title = "";
  }
}
