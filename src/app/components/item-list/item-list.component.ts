import { Item } from "./../../shared/models";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.sass"]
})
export class ItemListComponent implements OnInit {
  items: Item[] = [
    {
      title: "Test 1",
      createdAt: "2019-01-01"
    },
    {
      title: "Test 2",
      createdAt: "2019-01-02"
    },
    {
      title: "Test 3",
      createdAt: "2019-01-03"
    },
    {
      title: "Test 4",
      createdAt: "2019-01-04"
    }
  ];
  constructor() {}

  ngOnInit() {}
}
