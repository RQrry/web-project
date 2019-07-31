import React, { Component } from 'react'

class TodoItem extends Component {
  handleClick () {
    const { onHandleDelete, index } = this.props;
    onHandleDelete(index)
  }

  render () {
    const { content } = this.props;
    return (
      <li className="item" onClick={() => this.handleClick()}>{content}</li>
    );
  }
}

class TodoList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputValue: '',
      list: []
    };
  }

  handleChange (e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleSubmit () {
    this.setState(state => ({
      list: [...state.list, state.inputValue],
      inputValue: ''
    }))
  }

  handleDelete (index) {
    this.setState(state => {
      const list = [...state.list];
      list.splice(index, 1);
      return {list};
    })
  }

  getItem () {
    return this.state.list.map((item, index) => 
      <TodoItem
        content={item} index={index} key={item}
        onHandleDelete={(index) => this.handleDelete(index)}
      />
    )
  }

  render () {
    const { inputValue } = this.state;
    return (
      <div className="todo-list">
        <h2>Todo</h2>
        <input value={inputValue} placeholder="输入内容 点击列表进行删除" onChange={(e) => this.handleChange(e)} />
        <button onClick={() => this.handleSubmit()}>Submit</button>
        <ul>
          {this.getItem()}
        </ul>
      </div>
    );
  }
}

export default TodoList;