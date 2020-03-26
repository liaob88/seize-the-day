import { createMockItem } from './../shared/factory/item';
import reducer, { actions, initialState } from '../store/store';

describe('itemListReducer', () => {
  describe('Actions', () => {
    it('create', () => {
      const newItem = createMockItem({ id: 2, title: 'Test 2' });

      const expected = {
        ...initialState,
        items: [...initialState.items, newItem]
      };

      expect(
        reducer(initialState, actions.createItem({ item: newItem }))
      ).toEqual(expected);
    });

    it('delete', () => {
      const expected = { items: [] };
      expect(reducer(initialState, actions.deleteItem({ id: 1 }))).toEqual(
        expected
      );
    });

    describe('update', () => {
      it('update 対象の Item がない時', () => {
        const updatedItem = createMockItem({
          id: 1,
          title: 'Test 1 Updated!!!!!'
        });

        const expected = {
          items: [updatedItem]
        };

        expect(
          reducer(initialState, actions.updateItem({ item: updatedItem }))
        ).toEqual(expected);
      });

      it('update 対象の Item がある時', () => {
        const updatedItem = createMockItem({
          id: 2,
          title: 'Test 1 Updated!!!!!'
        });

        expect(
          reducer(initialState, actions.updateItem({ item: updatedItem }))
        ).toEqual(initialState);
      });
    });
  });
});
