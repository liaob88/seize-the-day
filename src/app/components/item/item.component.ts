import { Component, OnInit, Input } from "@angular/core";
import { Item } from "src/app/shared/models";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.sass"]
})
export class ItemComponent implements OnInit {
  @Input()
  items: Item[];
  constructor() {}

  ngOnInit() {}
}
