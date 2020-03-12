import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getUniqueStr } from "../../shared/domains/unique_id_maker";
import { Item } from "../../shared/models";
import { ItemListService } from "../item-list/item-list.service";

@Component({
  selector: "app-item-add",
  templateUrl: "./item-add.component.html",
  styleUrls: ["./item-add.component.scss"]
})
export class ItemAddComponent implements OnInit {
  title: string;

  constructor(
    private itemListService: ItemListService,
    private route: Router
  ) {}

  ngOnInit() {
    this.title = "";
  }

  async addItem() {
    const id = getUniqueStr();
    const title = this.title;
    const createdAt = new Date();
    const newItem = new Item(id, title, createdAt);
    await this.itemListService.addedItem(newItem);

    this.route.navigateByUrl("/list");
  }
}
