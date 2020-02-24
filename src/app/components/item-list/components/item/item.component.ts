import { ItemListService } from "./../../item-list.service";
import { Component, OnInit, Input } from "@angular/core";
import { Item } from "../../../../shared/models";
import { Router } from "@angular/router";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.sass"]
})
export class ItemComponent implements OnInit {
  items: Item[];
  constructor(
    private router: Router,
    private itemListService: ItemListService
  ) {}

  ngOnInit() {
    this.items = this.itemListService.items;
  }

  delete(targetId: number) {
    this.itemListService.deletedItem(targetId);
  }

  navigateToEditPage(id: number) {
    this.router.navigate([`/edit/${id}`]);
  }
}
