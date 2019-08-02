import React from 'react';
import { Input, Button, List } from 'antd';

const TodoListUI = (props) => {
  return (
    <div style={{margin: 20}}>
      <Input
        value={props.inputValue}
        placeholder="Input todo info..."
        style={{width: 300}}
        onChange={(e) => props.handleInputChange(e)}
      />
      <Button type="primary" style={{marginLeft: 10}} onClick={() => props.handleItemAdd()}>Submit</Button>
      <List
        bordered
        dataSource={props.list}
        style={{width: 300, marginTop: 10}}
        renderItem={(item, index) => <List.Item onClick={() => props.handleItemDelete(index)}>{item}</List.Item>}
      />
    </div>
  )
}

export default TodoListUI;