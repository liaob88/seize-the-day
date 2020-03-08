import { Component, OnInit } from "@angular/core";
import { ItemListService } from "../../item-list.service";
import { getUniqueStr } from "../../../../shared/domains/unique_id_maker";
import { Item } from "../../../../shared/models";

@Component({
  selector: "app-item-add",
  templateUrl: "./item-add.component.html",
  styleUrls: ["./item-add.component.scss"]
})
export class ItemAddComponent implements OnInit {
  title: string;

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {}

  async addItem() {
    const id = getUniqueStr();
    const title = this.title;
    const createdAt = new Date();
    const newItem = new Item(id, title, createdAt);
    await this.itemListService.addedItem(newItem);

    this.title = "";
  }
}
