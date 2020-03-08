import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ButtonComponent } from "./button.component";

describe("ButtonComponent", () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    // tslint:disable-next-line: no-non-null-assertion
    component = fixture.componentInstance;
    component.size = "large";
    component.color = "pink";

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("input で受け取った ng-children の内容が class 名に反映されていること", () => {
    const expected = `button ${component.size} ${component.color}`;
    const className = fixture.debugElement.query(By.css("button")).nativeElement
      .className;
    expect(className).toBe(expected);
  });

  it("button がクリックされた時、 eventEmitter が emit されること", () => {
    spyOn(component.clicked, "emit");
    const button = fixture.debugElement.query(By.css("button")).nativeElement;
    button.click();

    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
