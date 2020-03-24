import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemCreateComponent } from './pages/item-create/item-create.component';
import { ItemEditComponent } from './pages/item-edit/item-edit.component';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { ItemListService } from './pages/item-list/item-list.service';
import { ItemComponent } from './pages/item/item.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { MarkdownPipe } from './shared/pipes/markdown.pipe';
import { MaterialModule } from './shared/styles/material.module';
import { default as itemsReducer, featureName } from './store/store';

@NgModule({
  declarations: [
    AppComponent,
    ItemCardComponent,
    ItemListComponent,
    ItemEditComponent,
    ItemCreateComponent,
    ButtonComponent,
    MarkdownPipe,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(featureName, itemsReducer),
    StoreDevtoolsModule.instrument(),
    ReactiveFormsModule
  ],
  providers: [ItemListService],
  bootstrap: [AppComponent]
})
export class AppModule {}
