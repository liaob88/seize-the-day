import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { BehaviorSubject } from "rxjs";
import { Item } from "src/app/shared/models";
import { ItemListService } from "./../../item-list.service";
import { ItemComponent } from "./item.component";
import { By } from "@angular/platform-browser";

class MockItemListService implements Partial<ItemListService> {
  items$ = new BehaviorSubject<Item[] | null>([
    new Item(1, "Test 1", new Date("2019/01/01"))
  ]);
  deletedItem() {}
}

describe("ItemComponent", () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let router: Router;
  let itemListService: MockItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [{ provide: ItemListService, useClass: MockItemListService }]
    }).compileComponents();

    router = TestBed.get(Router);
    itemListService = TestBed.get(ItemListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("items$", () => {
    it("default", () => {
      itemListService.items$.subscribe(items =>
        expect(items).toEqual([new Item(1, "Test 1", new Date("2019/01/01"))])
      );
    });

    it("store の情報が更新されると items$ が更新されること", () => {
      const items = [
        new Item(1, "Test 1", new Date()),
        new Item(2, "Test 2", new Date())
      ];
      itemListService.items$.next(items);
      fixture.detectChanges();

      const itemElement = fixture.debugElement.queryAll(By.css(".item-div"));

      expect(itemElement.length).toBe(2);
    });
  });

  it("delete() called", () => {
    spyOn(itemListService, "deletedItem");
    component.delete(3);
    fixture.detectChanges();

    expect(itemListService.deletedItem).toHaveBeenCalledWith(3);
  });

  it("navigateToEditPage() が呼ばれると、指定された id を持つ item の編集ページに遷移すること", () => {
    spyOn(router, "navigate");
    component.navigateToEditPage(3);
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(["/edit/3"]);
  });
});
