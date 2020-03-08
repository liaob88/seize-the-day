import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent {
  constructor() {}

  @Input()
  shape: "large" | "small" | "circle";
  @Input()
  color: "red" | "pink" | "blue" | "green";
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
