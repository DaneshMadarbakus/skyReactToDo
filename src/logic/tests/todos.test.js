import reducer, { initialState, addItem, deleteItem, toggleCompleteItem, toggleHideItems } from '../todos';

describe('reducer', () => {
  it('should return state for unknown action', () => {
    const mockState = { test: 'testItem' };
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(mockState, mockAction);
    expect(result).toEqual(mockState);
  });

  it('should use initial state if state not provided', () => {
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(undefined, mockAction);
    expect(result).toEqual(initialState);
  });

  it('should add new items on ADD_ITEM', () => {
    const state = {
      items: [{ id: 1, content: 'first', isCompleted: false }, { id: 2, content: 'second', isCompleted: false }],
    };
    const mockAction = addItem('third');
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(3);
    expect(result.items[2].id).toEqual(3);
    expect(result.items[2].content).toEqual('third');
    expect(result.items[2].isCompleted).toEqual(false);
  });

  it('should remove item on DELETE_ITEM', () => {
    const state = {
      items: [{ id: 1, content: 'first', isCompleted: false }, { id: 2, content: 'second', isCompleted: false  }, {id: 3, content: 'third', isCompleted: false }],
    };
    const mockAction = deleteItem(1);
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toEqual(2);
    expect(result.items[0].content).toEqual('second');
  })

  it('should complete item on TOGGLE_COMPLETE_ITEM', () => {
    const state = {
      items: [{ id: 1, content: 'first', isCompleted: false }, { id: 2, content: 'second', isCompleted: true }, {id: 3, content: 'third', isCompleted: false}],
    };
    const mockAction = toggleCompleteItem(1);
    const mockAction2 = toggleCompleteItem(2);
    const result = reducer(state, mockAction);
    const resultTwo = reducer(state, mockAction2);

    expect(result.items[0].isCompleted).toEqual(true);
    expect(resultTwo.items[1].isCompleted).toEqual(false);
  })

  it('should toggle state on TOGGLE_HIDE_ITEMS', () => {
    const state = {
      hideCompletedItems: false
    };
    const mockAction = toggleHideItems();
    const result = reducer(state, mockAction);
    expect(result.hideCompletedItems).toEqual(true);
  })
});
