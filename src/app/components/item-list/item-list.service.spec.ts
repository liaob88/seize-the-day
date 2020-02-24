import { TestBed } from "@angular/core/testing";
import { ItemListService } from "./item-list.service";
import { Item } from "../../shared/models";

describe("ItemListService", () => {
  let itemListService: ItemListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemListService]
    });
    itemListService = TestBed.get(ItemListService);
  });

  it("addedItem() が実行されると addItemEmitter に指定したデータが流されること", () => {
    const newItem = new Item(5, "Test 5", new Date("2019/01/05"));

    spyOn(itemListService.addItemEmitter, "next");
    itemListService.addedItem(newItem);
    expect(itemListService.addItemEmitter.next).toHaveBeenCalledWith(newItem);
  });

  it("deletedItem() が実行されると deleteItemEmitter に指定したデータが流されること", () => {
    spyOn(itemListService.deleteItemEmitter, "next");
    itemListService.deletedItem(3);
    expect(itemListService.deleteItemEmitter.next).toHaveBeenCalledWith(3);
  });
});
