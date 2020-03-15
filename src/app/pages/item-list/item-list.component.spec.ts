import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ItemCreateComponent } from '../item-create/item-create.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ItemCardComponent } from '../../components/item-card/item-card.component';
import { ItemListComponent } from './item-list.component';
import { ItemListService } from './item-list.service';
import { MarkdownPipe } from 'src/app/shared/pipes/markdown.pipe';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let itemListService: ItemListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemListComponent,
        ItemCreateComponent,
        ItemCardComponent,
        MarkdownPipe
      ],
      providers: [ItemListService, provideMockStore({})],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, StoreModule]
    }).compileComponents();

    itemListService = TestBed.get(ItemListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
