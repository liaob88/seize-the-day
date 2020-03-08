import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent {
  constructor() {}

  @Input()
  size?: "large" | "small";
  @Input()
  color?: "pink" | "blue" | "green";
  @Output()
  clicked = new EventEmitter();

  onClick() {
    this.clicked.emit();
  }
}
