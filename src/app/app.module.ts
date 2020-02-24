import { ItemListService } from "./components/item-list/item-list.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemComponent } from "./components/item-list/components/item/item.component";
import { ItemListComponent } from "./components/item-list/item-list.component";
import { ItemEditComponent } from "./components/item-list/components/item-edit/item-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemListComponent,
    ItemEditComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [ItemListService],
  bootstrap: [AppComponent]
})
export class AppModule {}
