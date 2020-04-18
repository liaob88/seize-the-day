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
import { EditorComponent } from './admin/components/editor/editor.component';
import { HomeModule } from './home/home.module';
import { ItemCreateComponent } from './admin/item-create/item-create.component';
import { ItemEditComponent } from './admin/item-edit/item-edit.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/styles/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ItemEditComponent,
    ItemCreateComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
