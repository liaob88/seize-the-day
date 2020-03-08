import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItemEditComponent } from "./pages/item-edit/item-edit.component";
import { ItemListComponent } from "./pages/item-list/item-list.component";

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
