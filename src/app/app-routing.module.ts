import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItemEditComponent } from "./components/item-list/components/item-edit/item-edit.component";
import { ItemListComponent } from "./components/item-list/item-list.component";

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: ItemListComponent },
  { path: "edit/:id", component: ItemEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
