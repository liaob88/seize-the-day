import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemCreateComponent } from './pages/item-create/item-create.component';
import { ItemEditComponent } from './pages/item-edit/item-edit.component';
import { ItemListService } from './home/home-page/item-list.service';
import { ButtonComponent } from './shared/components/button/button.component';
import { FirebaseService } from './shared/services/firebase.service';
import { MaterialModule } from './shared/styles/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ItemCardComponent,
    ItemEditComponent,
    ItemCreateComponent,
    ButtonComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot()
  ],
  providers: [ItemListService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
