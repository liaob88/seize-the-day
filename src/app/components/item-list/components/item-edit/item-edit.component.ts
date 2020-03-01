import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Item } from "../../../../shared/models";
import { ItemListService } from "./../../item-list.service";

@Component({
  selector: "app-item-edit",
  templateUrl: "./item-edit.component.html",
  styleUrls: ["./item-edit.component.sass"]
})
export class ItemEditComponent implements OnInit {
  item: Item;
  updatedTitle: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private itemListService: ItemListService,
    private router: Router
  ) {}

  readonly items$ = this.itemListService.items$;

  ngOnInit() {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      const itemId = Number(params.get("id"));
      this.items$.subscribe(
        items =>
          // tslint:disable-next-line: no-string-literal
          (this.item = items["items"].find(target => target.id === itemId))
      );

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
