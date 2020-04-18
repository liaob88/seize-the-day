import { HomePageComponent } from './home-page/home-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from '../components/item-card/item-card.component';

@NgModule({
  declarations: [
    ArticlePageComponent,
    HomePageComponent,
    // TODO: AdminModule or SharedModule ができたらそいつを import してここを消す
    ItemCardComponent
  ],
  imports: [CommonModule]
})
export class HomeModule {}
