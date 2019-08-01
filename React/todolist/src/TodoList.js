import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store';

class TodoList extends Component {
  constructor (props) {
    super(props);
    this.state = store.getState();
    store.subscribe(() => this.handleStoreChange());
  }

  handleInputChange (e) {
    const action = {
      type: 'change_input_value',
      value: e.target.value
    }
    store.dispatch(action);
  }

  handleStoreChange () {
    this.setState(store.getState());
  }

  handleClick () {
    const action = {
      type: 'add_todo_item',
      value: this.state.inputValue
    }
    store.dispatch(action);
  }

  render () {
    return (
      <div style={{margin: 20}}>
        <Input
          value={this.state.inputValue}
          placeholder="Input todo info..."
          style={{width: 300}}
          onChange={(e) => this.handleInputChange(e)}
        />
        <Button
          type="primary"
          style={{marginLeft: 10}}
          onClick={() => this.handleClick()}
        >Submit</Button>
        <List
          bordered
          dataSource={this.state.list}
          style={{width: 300, marginTop: 10}}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    )
  }
}

export default TodoList;