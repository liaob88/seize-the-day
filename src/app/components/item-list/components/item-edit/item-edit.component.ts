import { log } from "util";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Item } from "../../../../shared/models";
import { ItemListService } from "./../../item-list.service";

@Component({
  selector: "app-item-edit",
  templateUrl: "./item-edit.component.html",
  styleUrls: ["./item-edit.component.scss"]
})
export class ItemEditComponent implements OnInit {
  item: Item;
  updatedTitle: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemListService: ItemListService,
    private router: Router
  ) {}

  readonly items$ = this.itemListService.items$;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const itemId = Number(params.get("id"));

      this.items$.subscribe(items => {
        this.item = items.find(item => item.id === itemId);
      });

      this.updatedTitle = this.item.title;
    });
  }

  updateItem() {
    const updatedItem = {
      ...this.item,
      title: this.updatedTitle,
      createdAt: new Date()
    };

    this.itemListService.updatedItem(updatedItem);

    this.router.navigate(["/"]);
  }
}
