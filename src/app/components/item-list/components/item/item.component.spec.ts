import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ItemListService } from "./../../item-list.service";
import { ItemComponent } from "./item.component";

describe("ItemComponent", () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let router: Router;
  let itemListService: ItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [{ provide: ItemListService, useClass: ItemListService }]
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

  it("ngOnInit() が呼ばれると、items に指定した items が代入されること ", () => {
    spyOn(component, "ngOnInit");
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.items.length).toBe(4);
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
