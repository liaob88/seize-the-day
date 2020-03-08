import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ItemListService } from "../../pages/item-list/item-list.service";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent {
  constructor(
    private router: Router,
    private itemListService: ItemListService
  ) {}

  readonly items$ = this.itemListService.items$;

  delete(targetId: number) {
    this.itemListService.deletedItem(targetId);
  }

  navigateToEditPage(id: number) {
    this.router.navigate([`/edit/${id}`]);
  }
}
