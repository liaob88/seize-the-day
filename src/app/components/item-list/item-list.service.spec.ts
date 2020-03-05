import { TestBed } from "@angular/core/testing";
import { Action, Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { skip } from "rxjs/operators";
import { actions as itemListActions } from "../../store/store";
import { Item } from "./../../shared/models";
import { ItemListService } from "./item-list.service";

describe("ItemListService", () => {
  let itemListService: ItemListService;
  let store: MockStore<{}>;
  // tslint:disable-next-line: no-shadowed-variable
  const initialState: Item[] = [
    { id: 1, title: "Test 1", createdAt: new Date("2020-01-01") }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemListService, provideMockStore({ initialState })]
    });
    itemListService = TestBed.get(ItemListService);
    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();
  });

  it("should be created", () => {
    const type: ItemListService = TestBed.get(ItemListService);
    expect(type).toBeTruthy();
  });

  it("addedItem() が実行されると、 actions.createItem が dispatch されること", async () => {
    const newItem: Item = {
      id: 2,
      title: "Test 2",
      createdAt: new Date("2020-01-01")
    };
    const createItemAction = itemListActions.createItem({ item: newItem });
    const expected = [createItemAction];
    const actions: Action[] = [];
    store.scannedActions$
      .pipe(skip(1))
      .subscribe(action => actions.push(action));

    await itemListService.addedItem(newItem);
    expect(actions).toEqual(expected);
  });

  it("deletedItem() が実行されると、 actions.deleteItem が dispatch されること", async () => {
    const targetItemId = 1;
    const deleteItemAction = itemListActions.deleteItem({ id: targetItemId });
    const expected = [deleteItemAction];
    const actions: Action[] = [];
    store.scannedActions$
      .pipe(skip(1))
      .subscribe(action => actions.push(action));

    await itemListService.deletedItem(targetItemId);
    expect(actions).toEqual(expected);
  });

  it("updatedItem() が実行されると、 actions.updateItem が dispatch されること", async () => {
    const updatedItem: Item = {
      id: 1,
      title: "Test 1 updated",
      createdAt: new Date("2020-01-01")
    };
    const updateItemAction = itemListActions.updateItem({ item: updatedItem });
    const expected = [updateItemAction];
    const actions: Action[] = [];
    store.scannedActions$
      .pipe(skip(1))
      .subscribe(action => actions.push(action));

    await itemListService.updatedItem(updatedItem);
    expect(actions).toEqual(expected);
  });
});
