import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditorComponent } from './shared/components/editor/editor.component';

@NgModule({
  declarations: [
    CreatePageComponent,
    EditPageComponent,
    EditorComponent,
    LoginPageComponent,
    DashboardComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forChild(),
    AdminRoutingModule
  ]
})
export class AdminModule {}
