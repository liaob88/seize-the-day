import { HomePageComponent } from './home/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './home/article-page/article-page.component';
import { ItemCreateComponent } from './pages/item-create/item-create.component';
import { ItemEditComponent } from './pages/item-edit/item-edit.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'create', component: ItemCreateComponent },
  {
    path: 'articles',
    children: [
      { path: ':id', component: ArticlePageComponent },
      { path: ':id/edit', component: ItemEditComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
