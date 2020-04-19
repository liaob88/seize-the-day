import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { MaterialModule } from './styles/material.module';

@NgModule({
  declarations: [ItemCardComponent, ButtonComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ItemCardComponent, ButtonComponent, MaterialModule]
})
export class SharedModule {}
