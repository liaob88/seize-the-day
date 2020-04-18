import { ItemCardComponent } from './../shared/components/item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../shared/styles/material.module';
import { ArticlePageComponent } from './article-page/article-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ArticlePageComponent, HomePageComponent],
  imports: [CommonModule, MaterialModule, SharedModule]
})
export class HomeModule {}
