import React, { Component } from 'react';
import 'antd/dist/antd.css';
import store from './store';
import { getInputChangeAction, getItemAddAction, getItemDeleteAction } from './store/actionCreators'
import TodoListUI from './TodoListUI';

class TodoList extends Component {
  constructor (props) {
    super(props);
    this.state = store.getState();
    store.subscribe(() => this.handleStoreChange());
  }
  
  // store 数据变化
  handleStoreChange () {
    this.setState(store.getState());
  }

  // input 框改变
  handleInputChange (e) {
    store.dispatch(getInputChangeAction(e.target.value));
  }

  // 添加一条 item
  handleItemAdd () {
    store.dispatch(getItemAddAction());
  }

  // 删除一条 item
  handleItemDelete (index) {
    store.dispatch(getItemDeleteAction(index));
  }

  render () {
    return (
      <TodoListUI
        inputValue={this.state.inputValue}
        list={this.state.list}
        handleInputChange={this.handleInputChange}
        handleItemAdd={this.handleItemAdd}
        handleItemDelete={this.handleItemDelete}
      />
    )
  }
}

export default TodoList;