import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes';

const defaultState = {
  inputValue: '',
  list: ['test1', 'test2']
};

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch(action.type) {
    case CHANGE_INPUT_VALUE:
      newState.inputValue = action.value;
      return newState;
    case ADD_TODO_ITEM:
      newState.list.push(newState.inputValue);
      newState.inputValue = '';
      return newState;
    case DELETE_TODO_ITEM:
      newState.list.splice(action.index, 1);
      return newState;
    default:
        return state;
  }
}