import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemComponent } from "./components/item/item.component";
import { ItemListComponent } from './components/item-list/item-list.component';

@NgModule({
  declarations: [AppComponent, ItemComponent, ItemListComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
