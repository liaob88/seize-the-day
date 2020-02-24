import { FormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ItemComponent } from "./components/item/item.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemListComponent } from "./item-list.component";
import { Item } from "src/app/shared/models";
import { RouterTestingModule } from "@angular/router/testing";

describe("ItemListComponent", () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListComponent, ItemComponent],
      imports: [FormsModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    component.items = [
      new Item(1, "Test 1", "2019-01-01"),
      new Item(2, "Test 2", "2019-01-02"),
      new Item(3, "Test 3", "2019-01-03"),
      new Item(4, "Test 4", "2019-01-04")
    ];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("addItem() called", () => {
    component.title = "Test 5";
    component.addItem();
    fixture.detectChanges();

    expect(component.items.length).toBe(5);
    expect(component.items[4].id).toBe(5);
    expect(component.items[4].title).toBe("Test 5");
  });
});
