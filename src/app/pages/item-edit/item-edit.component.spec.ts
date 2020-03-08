import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, convertToParamMap, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { BehaviorSubject, of } from "rxjs";
import { Item } from "../../shared/models";
import { ItemListService } from "../item-list/item-list.service";
import { ItemEditComponent } from "./item-edit.component";

class MockItemListService implements Partial<ItemListService> {
  items$ = new BehaviorSubject<Item[]>(null);
  updatedItem() {}
}

describe("ItemEditComponent", () => {
  let component: ItemEditComponent;
  let fixture: ComponentFixture<ItemEditComponent>;
  let itemListService: MockItemListService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemEditComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        { provide: ItemListService, useClass: MockItemListService },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: 1 })) }
        }
      ]
    }).compileComponents();

    itemListService = TestBed.get(ItemListService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditComponent);
    component = fixture.componentInstance;
    itemListService.items$.next([new Item(1, "Test 1", new Date())]);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("ngOnInit() が呼ばれると表示すべき item が取得でき、 item.title がコンポーネントの title に代入できる", () => {
    spyOn(component, "ngOnInit");
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.item.id).toBe(1);
  });

  describe("updateItem() が呼ばれる", () => {
    it("updatedItem が作成され、itemListService.updatedItem(updatedItem) が呼ばれること", () => {
      component.updatedTitle = "Test 1 updated";

      const now = new Date(2020, 2, 2);
      jasmine.clock().mockDate(now);

      const newItem = {
        ...component.item,
        title: component.updatedTitle,
        createdAt: new Date()
      };

      spyOn(itemListService, "updatedItem");
      component.updateItem();

      expect(itemListService.updatedItem).toHaveBeenCalledWith(newItem);
    });

    it("ホームに遷移すること", () => {
      spyOn(router, "navigate");
      component.updateItem();
      fixture.detectChanges();

      expect(router.navigate).toHaveBeenCalledWith(["/"]);
    });
  });
});
