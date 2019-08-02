import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store';
import { getInputChangeAction, getItemAddAction, getItemDeleteAction } from './store/actionCreators'

class TodoList extends Component {
  constructor (props) {
    super(props);
    this.state = store.getState();
    store.subscribe(() => this.handleStoreChange());
  }
  
  handleStoreChange () {
    this.setState(store.getState());
  }

  handleInputChange (e) {
    store.dispatch(getInputChangeAction(e.target.value));
  }

  handleItemAdd () {
    store.dispatch(getItemAddAction());
  }

  handleItemDelete (index) {
    store.dispatch(getItemDeleteAction(index));
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
          onClick={() => this.handleItemAdd()}
        >Submit</Button>
        <List
          bordered
          dataSource={this.state.list}
          style={{width: 300, marginTop: 10}}
          renderItem={(item, index) => 
            <List.Item onClick={() => this.handleItemDelete(index)}>{item}</List.Item>
          }
        />
      </div>
    )
  }
}

export default TodoList;