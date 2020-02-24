import { Component, OnInit, Input } from "@angular/core";
import { Item } from "../../../../shared/models";
import { Router } from "@angular/router";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.sass"]
})
export class ItemComponent implements OnInit {
  @Input()
  items: Item[];
  constructor(private router: Router) {}

  ngOnInit() {}

  delete(targetId: number) {
    this.items = this.items.filter(item => item.id !== targetId);
  }

  navigateToEditPage(id: number) {
    this.router.navigate([`/edit/${id}`]);
  }
}
