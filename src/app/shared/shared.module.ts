import { MaterialModule } from './styles/material.module';
import { ButtonComponent } from './components/button/button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './components/item-card/item-card.component';

@NgModule({
  declarations: [ItemCardComponent, ButtonComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ItemCardComponent, ButtonComponent]
})
export class SharedModule {}
