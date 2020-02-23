import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ItemComponent } from "./item.component";
import { Item } from "../../../../shared/models";
import { NO_ERRORS_SCHEMA, Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <input
      [(ngModel)]="title"
      type="text"
      placeholder="タスクを入力してください"
    />
    <button (click)="addItem()">追加</button>
    <app-item [items]="items"></app-item>
  `
})
class TestComponent {
  items: Item[];
}

describe("ItemComponent", () => {
  let component: ItemComponent;
  let hostComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ItemComponent, TestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    hostComponent = fixture.componentInstance;
    hostComponent.items = [
      new Item(1, "Test 1", "2019-01-01"),
      new Item(2, "Test 2", "2019-01-02"),
      new Item(3, "Test 3", "2019-01-03"),
      new Item(4, "Test 4", "2019-01-04")
    ];
    // tslint:disable-next-line: no-non-null-assertion
    component = fixture.debugElement.query(By.directive(ItemComponent))!
      .componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("item が正しく表示されていること", () => {
    const testContents = [
      { target: ".item-id", expected: ["id: 1", "id: 2", "id: 3", "id: 4"] },
      {
        target: ".item-title",
        expected: ["Test 1", "Test 2", "Test 3", "Test 4"]
      },
      {
        target: ".item-created_at",
        expected: [
          "作成日時: 2019-01-01",
          "作成日時: 2019-01-02",
          "作成日時: 2019-01-03",
          "作成日時: 2019-01-04"
        ]
      }
    ];

    testContents.forEach(testContent => {
      const result = fixture.debugElement
        .queryAll(By.css(`${testContent.target}`))
        .map(item => item.nativeElement.innerText);

      expect(result).toEqual(testContent.expected);
    });
  });

  it("delete() called", () => {
    component.delete(1);
    fixture.detectChanges();

    const itemIds = component.items.reduce(
      (ids, item: Item) => [...ids, item.id],
      []
    );

    expect(itemIds).toEqual([2, 3, 4]);
  });
});
