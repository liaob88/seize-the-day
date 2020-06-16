import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './home/article-page/article-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'articles',
    children: [{ path: ':id', component: ArticlePageComponent }]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
