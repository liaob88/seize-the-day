import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ArticleService } from './services/article.service';
import { FirebaseService } from './services/firebase.service';
import { MaterialModule } from './styles/material.module';

@NgModule({
  declarations: [ItemCardComponent, ButtonComponent],
  imports: [CommonModule, MaterialModule],
  providers: [ArticleService, FirebaseService],
  exports: [ItemCardComponent, ButtonComponent]
})
export class SharedModule {}
