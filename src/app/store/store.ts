import { Item } from "./../shared/models";
import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
  union
} from "@ngrx/store";

// Actions
const createItem = createAction(
  "[ Item-List Component ] Create New Item",
  props<{ item: Item }>()
);
const deleteItem = createAction(
  "[ Item-List Component ] Delete The Item",
  props<{ id: number }>()
);
const updateItem = createAction(
  "[ Item-List Component ] Update The Item",
  props<{ item: Item }>()
);

export const actions = { createItem, deleteItem, updateItem };
const actionUnion = union(actions);

export interface State {
  items: Item[];
}
export const initialState: State = {
  items: [
    new Item(1, "Test 1", new Date("2019/01/01")),
    new Item(2, "Test 2", new Date("2019/01/02")),
    new Item(3, "Test 3", new Date("2019/01/03")),
    new Item(4, "Test 4", new Date("2019/01/04"))
  ]
};

// Reducer
const itemListReducer = createReducer(
  initialState,
  on(createItem, (state, { item }) => ({
    ...state.items,
    items: [...state.items, item]
  })),
  on(deleteItem, (state, { id }) => ({
    ...state,
    items: state.items.filter(i => i.id !== id)
  })),
  on(updateItem, (state, { item }) => ({
    ...state,
    items: state.items.map(i => (i.id === item.id ? item : i))
  }))
);

export default function reducer(state: State, action: typeof actionUnion) {
  return itemListReducer(state, action);
}

// selector

export interface FeatureState {
  itemList: Item[];
}

export interface AppState {
  feature: FeatureState;
}

export const selectFeature = (state: AppState) => state.feature;

export const selectFeatureCount = createSelector(
  selectFeature,
  (state: FeatureState) => state.itemList
);
