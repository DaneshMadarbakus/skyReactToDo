export const ADD_ITEM = 'qgo/assessment/ADD_ITEM';
export const DELETE_ITEM = 'qgo/assessment/DELETE_ITEM';
export const COMPLETE_ITEM = 'qgo/assessment/COMPLETE_ITEM';

export const addItem = (content) => {
  return { type: ADD_ITEM, content };
};

export const deleteItem = (id) => {
  return { type: DELETE_ITEM, id };
};

export const completeItem = (id) => {
  return { type: COMPLETE_ITEM, id };
};

export const initialState = {
  items: [
    { id: 1, content: 'Call mum', isCompleted: false },
    { id: 2, content: 'Buy cat food', isCompleted: false },
    { id: 3, content: 'Water the plants', isCompleted: false },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const nextId =
        state.items.reduce((id, item) => Math.max(item.id, id), 0) + 1;
      const newItem = {
        id: nextId,
        content: action.content,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };

    case DELETE_ITEM:
      const itemsCopy = state.items;

      return {
        ...state,
        items: itemsCopy.filter((x) => x.id !== action.id)
      };

    case COMPLETE_ITEM:
      const itemsCopy = state.items;

      return {
        ...state,
        items: itemsCopy.filter((x) => x.id !== action.id)
      };

    default:
      return state;
  }
};

export default reducer;
