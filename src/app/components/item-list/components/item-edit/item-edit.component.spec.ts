import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, convertToParamMap, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { Item } from "../../../../shared/models";
import { ItemListService } from "./../../item-list.service";
import { ItemEditComponent } from "./item-edit.component";

const mockActivatedRoute = { paramMap: of(convertToParamMap({ id: 1 })) };

describe("ItemEditComponent", () => {
  let component: ItemEditComponent;
  let fixture: ComponentFixture<ItemEditComponent>;
  let itemListService: ItemListService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemEditComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        ItemListService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    itemListService = TestBed.get(ItemListService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditComponent);
    component = fixture.componentInstance;
    itemListService.items = [
      new Item(1, "Test 1", new Date("2019/01/01")),
      new Item(2, "Test 2", new Date("2019/01/02")),
      new Item(3, "Test 3", new Date("2019/01/03")),
      new Item(4, "Test 4", new Date("2019/01/04"))
    ];
    fixture.detectChanges();
    component.ngOnInit();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("ngOnInit() が呼ばれると表示すべき item が取得でき、 item.title がコンポーネントの title に代入できる", () => {
    spyOn(component, "ngOnInit");
    component.ngOnInit();
    fixture.detectChanges();

    const expectedItem = itemListService.items.find(item => item.id === 1);
    const expectedTitle = expectedItem.title;
    expect(component.item).toBe(expectedItem);
    expect(component.item.title).toBe(expectedTitle);
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
