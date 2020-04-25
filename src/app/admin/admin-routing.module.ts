import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  // MEMO: login はこのように別で良いのか？
  { path: 'login', component: LoginPageComponent },
  // MEMO: '' の時の動きは幾らか改善できそう
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },

      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create',
        component: CreatePageComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
