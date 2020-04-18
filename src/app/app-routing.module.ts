import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './home/article-page/article-page.component';
import { ItemListComponent } from './home/item-list/item-list.component';
import { ItemCreateComponent } from './pages/item-create/item-create.component';
import { ItemEditComponent } from './pages/item-edit/item-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ItemListComponent },
  { path: 'create', component: ItemCreateComponent },
  {
    path: 'articles',
    children: [
      { path: ':id', component: ArticlePageComponent },
      { path: ':id/edit', component: ItemEditComponent }
    ]
  },
  { path: '**', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
