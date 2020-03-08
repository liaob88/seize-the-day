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

export const initialState: Item[] = [
  { id: 1, title: "Test 1", createdAt: new Date("2020-01-01") }
];

// Reducer
const itemListReducer = createReducer(
  initialState,
  on(createItem, (state, { item }) => [...state, item]),
  on(deleteItem, (state, { id }) => [...state.filter(i => i.id !== id)]),
  on(updateItem, (state, { item }) => {
    state.map(i => {
      if (i.id === item.id) {
        state[state.indexOf(i)] = item;
      }
    });
    return [...state];
  })
);

export default function reducer(state: Item[], action: typeof actionUnion) {
  return itemListReducer(state, action);
}
