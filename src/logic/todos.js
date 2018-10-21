export const ADD_ITEM = 'qgo/assessment/ADD_ITEM';

export const DELETE_ITEM = 'qgo/assessment/DELETE_ITEM';

export const addItem = (content) => {
  return { type: ADD_ITEM, content };
};

export const deleteItem = (id) => {
  return {type: DELETE_ITEM, id};
};

export const initialState = {
  items: [
    { id: 1, content: 'Call mum' },
    { id: 2, content: 'Buy cat food' },
    { id: 3, content: 'Water the plants' },
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
      const indexOfItem = itemsCopy.map(function(item) { return item.id; }).indexOf(action.id);
      itemsCopy.splice(indexOfItem, 1);
      
      return {
        ...state,
        items: itemsCopy
      };

    default:
      return state;
  }
};

export default reducer;
