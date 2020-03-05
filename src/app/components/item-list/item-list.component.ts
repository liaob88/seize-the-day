import { Component, OnInit } from "@angular/core";
import { Item } from "../../shared/models";
import { ItemListService } from "./item-list.service";
import { getUniqueStr } from "../../shared/domains/unique_id_maker";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.sass"]
})
export class ItemListComponent {
  title: string;

  constructor(private itemListService: ItemListService) {}

  async addItem() {
    const id = getUniqueStr();
    const title = this.title;
    const createdAt = new Date();
    const newItem = new Item(id, title, createdAt);
    await this.itemListService.addedItem(newItem);

    this.title = "";
  }
}
