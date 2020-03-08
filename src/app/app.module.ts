import { ItemAddComponent } from "./pages/item-add/item-add.component";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemEditComponent } from "./pages/item-edit/item-edit.component";
import { ItemComponent } from "./components/item/item.component";
import { ItemListComponent } from "./pages/item-list/item-list.component";
import { ItemListService } from "./pages/item-list/item-list.service";
import reducer from "./store/store";
import { MaterialModule } from "./shared/styles/material.module";
import { ButtonComponent } from "./shared/components/button/button.component";

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemListComponent,
    ItemEditComponent,
    ItemAddComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    StoreModule.forRoot({ itemList: reducer }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ItemListService],
  bootstrap: [AppComponent]
})
export class AppModule {}
