import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePageComponent } from './create-page/create-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'create', component: CreatePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
