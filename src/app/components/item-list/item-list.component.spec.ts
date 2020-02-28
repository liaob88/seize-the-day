import { FormsModule } from "@angular/forms";
import { ItemComponent } from "./components/item/item.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemListComponent } from "./item-list.component";
import { Item } from "src/app/shared/models";
import { RouterTestingModule } from "@angular/router/testing";
import { ItemListService } from "./item-list.service";

describe("ItemListComponent", () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let itemListService: ItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListComponent, ItemComponent],
      providers: [ItemListService],
      imports: [FormsModule, RouterTestingModule]
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

  describe("ngOnInit() called", () => {
    it("items を itemListService から取得できること", () => {
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.items.length).toBe(4);
    });

    it("itemListService の addItemEmitter にデータが流されたら、該当のデータが追加されること", () => {
      const newItem = new Item(5, "Test 5", new Date("2019/01/05"));

      spyOn(component, "ngOnInit");
      itemListService.addItemEmitter.next(newItem);
      component.ngOnInit();
      fixture.detectChanges();

      const result = component.items.map(({ id }) => id);

      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(component.items.length).toBe(5);
    });

    it("itemListService の deleteItemEmitter にデータが流されたら、該当のデータが削除されること", () => {
      spyOn(component, "ngOnInit");
      itemListService.deleteItemEmitter.next(3);
      component.ngOnInit();
      fixture.detectChanges();

      const result = component.items.map(({ id }) => id);

      expect(result).toEqual([1, 2, 4]);
      expect(component.items.length).toBe(3);
    });

    it("itemListService の updateItemEmitter にデータが流されたら、該当のデータが渡されてきたデータに更新されること", () => {
      const date = new Date(2020, 2, 5);
      jasmine.clock().mockDate(date);

      const expected = {
        id: 1,
        title: "Test 1 updated",
        createdAt: new Date()
      };

      spyOn(component, "ngOnInit");
      itemListService.updateItemEmitter.next(expected);
      component.ngOnInit();
      fixture.detectChanges();

      const target = itemListService.items.find(
        item => item.id === expected.id
      );

      expect(target).toBe(expected);
    });
  });

  it("addItem() が実行されると、itemListService の addedItem が指定したデータとともに呼ばれること", () => {
    component.title = "Test 5";
    spyOn(itemListService, "addedItem");
    const today = new Date("2019/01/05");
    jasmine.clock().mockDate(today);

    const newItem = new Item(5, "Test 5", new Date("2019/01/05"));
    jasmine.clock().mockDate(today);
    component.addItem();

    expect(itemListService.addedItem).toHaveBeenCalledWith(newItem);
  });
});
