import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColors, ButtonShapes, ButtonTypes } from './button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  constructor() {}

  @Input()
  shape: ButtonShapes;
  @Input()
  color: ButtonColors;
  @Input()
  disabled: boolean;
  @Input()
  type: ButtonTypes;
  @Output()
  clicked = new EventEmitter();

  onClick() {
    this.clicked.emit();
  }

  get className() {
    const { shape, color } = this;
    return `button ${shape} ${color}`;
  }
}
