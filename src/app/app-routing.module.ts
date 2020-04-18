import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './admin/create-page/create-page.component';
import { EditPageComponent } from './admin/edit-page/edit-page.component';
import { ArticlePageComponent } from './home/article-page/article-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'create', component: CreatePageComponent },
  {
    path: 'articles',
    children: [
      { path: ':id', component: ArticlePageComponent },
      { path: ':id/edit', component: EditPageComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
