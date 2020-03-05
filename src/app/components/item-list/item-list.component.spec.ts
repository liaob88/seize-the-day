import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { ItemComponent } from "./components/item/item.component";
import { ItemListComponent } from "./item-list.component";
import { ItemListService } from "./item-list.service";

describe("ItemListComponent", () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let itemListService: ItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListComponent, ItemComponent],
      providers: [ItemListService, provideMockStore({})],
      imports: [FormsModule, RouterTestingModule, StoreModule]
    }).compileComponents();

    itemListService = TestBed.get(ItemListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
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
