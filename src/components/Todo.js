import React, { Component } from "react";
import "./style.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

class Todo extends Component {
  state = {
    todo: "",
    toDoList: [],
  };
  handleSubmit = async () => {
    let { todo, toDoList } = this.state;
    let data = {
      note: todo,
    };
    console.log();
    const result = await API.graphql(
      graphqlOperation(createTodo, { input: data })
    );
    let newTodo = result.data.createTodo;
    // console.log(toDoList);
    // return;
    let newList = [...this.state.toDoList, newTodo];
    this.setState({
      toDoList: newList,
      todo: "",
    });
  };
  handleChange = (e) => {
    this.setState({
      todo: e.target.value,
    });
  };
  handleEdit = (item) => {
    console.log(item);
  };

  async componentDidMount() {
    const response = await API.graphql(graphqlOperation(listTodos));
    const list = response.data.listTodos.items;
    this.setState({
      toDoList: list,
    });
    console.log(response.data);
  }
  render() {
    return (
      <div>
        <div class="container">
          <h2>Todo list</h2>
          <input
            onChange={(e) => {
              this.handleChange(e);
            }}
            type="text"
            id="inputData"
            placeholder="Add a task!"
            value={this.state.todo}
          />
          <button
            onClick={() => {
              this.handleSubmit();
            }}
            id="add"
          >
            Add
          </button>
          <div id="resault"></div>
        </div>
        <div id="done">
          {/* <h2>Done</h2> */}
          <div id="">
            {this.state.toDoList.length > 0 &&
              this.state.toDoList.map((item) => {
                return (
                  <div key={item.id} className="todoItem">
                    <p className="todotext">{item.note}</p>
                    <div
                      onClick={() => {
                        this.handleEdit(item);
                      }}
                      className="mt-3 todoEdit"
                    >
                      <AiOutlineEdit />
                    </div>
                    <div
                      onClick={(item) => {
                        alert();
                      }}
                      className="todoDelete"
                    >
                      <AiOutlineDelete />
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <button id="clearButton">Clear All</button> */}
        </div>
      </div>
    );
  }
}

export default Todo;
