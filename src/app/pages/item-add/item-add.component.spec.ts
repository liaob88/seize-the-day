import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { ItemListService } from "../item-list/item-list.service";
import { ItemAddComponent } from "./item-add.component";

describe("ItemAddComponent", () => {
  let component: ItemAddComponent;
  let fixture: ComponentFixture<ItemAddComponent>;
  let itemListService: ItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemAddComponent],
      providers: [
        { provide: itemListService, useClass: ItemListService },
        provideMockStore({})
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, StoreModule]
    }).compileComponents();

    itemListService = TestBed.get(ItemListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("addItem()", () => {
    it("itemListService の addedItem が呼ばれること", () => {
      spyOn(itemListService, "addedItem");
      component.addItem();
      expect(itemListService.addedItem).toHaveBeenCalled();
    });

    it("component.title が '' になること", () => {
      spyOn(itemListService, "addedItem");
      component.addItem();
      fixture.detectChanges();

      expect(component.title).toBeFalsy();
    });
  });
});
