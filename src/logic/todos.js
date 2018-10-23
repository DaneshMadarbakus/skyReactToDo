export const ADD_ITEM = 'qgo/assessment/ADD_ITEM';
export const DELETE_ITEM = 'qgo/assessment/DELETE_ITEM';
export const TOGGLE_COMPLETE_ITEM = 'qgo/assessment/TOGGLE_COMPLETE_ITEM';
export const TOGGLE_HIDE_ITEMS = 'qgo/assessment/TOGGLE_HIDE_ITEMS';

export const addItem = (content) => {
  return { type: ADD_ITEM, content };
};

export const deleteItem = (id) => {
  return { type: DELETE_ITEM, id };
};

export const toggleCompleteItem = (id) => {
  return { type: TOGGLE_COMPLETE_ITEM, id };
};

export const toggleHideItems = () => {
  return { type: TOGGLE_HIDE_ITEMS };
};

export const initialState = {
  hideCompletedItems: false, 
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
      const itemsCopy = [...state.items];

      return {
        ...state,
        items: itemsCopy.filter((x) => x.id !== action.id)
      };

    case TOGGLE_COMPLETE_ITEM:
      const itemsCopyOne = [...state.items];     
      itemsCopyOne.filter((x) => x.id === action.id)[0].isCompleted = !itemsCopyOne.filter((x) => x.id === action.id)[0].isCompleted;

      return {
        ...state,
        items: itemsCopyOne
      };

      case TOGGLE_HIDE_ITEMS:
      
      return {
        ...state,
        hideCompletedItems: !state.hideCompletedItems
      };

    default:
      return state;
  }
};

export default reducer;
