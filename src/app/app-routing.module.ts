import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemCreateComponent } from './pages/item-create/item-create.component';
import { ItemEditComponent } from './pages/item-edit/item-edit.component';
import { ItemListComponent } from './pages/item-list/item-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ItemListComponent },
  { path: 'create', component: ItemCreateComponent },
  { path: 'edit/:id', component: ItemEditComponent },
  { path: '**', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
