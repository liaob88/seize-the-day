import reducer, { actions } from "../store/store";

describe("itemListReducer", () => {
  describe("Actions", () => {
    it("create", () => {
      const newItem = {
        id: 1,
        title: "Test 1",
        createdAt: new Date("2020-01-01")
      };

      expect(reducer([], actions.createItem({ item: newItem }))).toEqual([
        newItem
      ]);
    });

    it("delete", () => {
      const state = [
        {
          id: 1,
          title: "Test 1",
          createdAt: new Date("2020-01-01")
        }
      ];

      expect(reducer(state, actions.deleteItem({ id: 1 }))).toEqual([]);
    });

    it("update", () => {
      const state = [
        {
          id: 1,
          title: "Test 1",
          createdAt: new Date("2020-01-01")
        },
        {
          id: 2,
          title: "Test 2",
          createdAt: new Date("2020-01-01")
        }
      ];

      const updatedItem = {
        id: 1,
        title: "Test 1 updated",
        createdAt: new Date("2020-01-01")
      };

      expect(reducer(state, actions.updateItem({ item: updatedItem }))).toEqual(
        [
          updatedItem,
          {
            id: 2,
            title: "Test 2",
            createdAt: new Date("2020-01-01")
          }
        ]
      );
    });
  });
});
