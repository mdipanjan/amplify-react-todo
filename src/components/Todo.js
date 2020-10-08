import React, { Component } from "react";
import "./style.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo, updateTodo, deleteTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

class Todo extends Component {
  state = {
    todo: "",
    toDoList: [],
    editId: "",
    editObj: {},
  };
  handleSubmit = async () => {
    let { todo, toDoList, editId, editObj } = this.state;
    let data = {
      note: todo,
    };

    if (editId === "") {
      const result = await API.graphql(
        graphqlOperation(createTodo, { input: data })
      );
      let newTodo = result.data.createTodo;

      let newList = [...this.state.toDoList, newTodo];
      this.setState({
        toDoList: newList,
        todo: "",
      });
    } else {
      let input = {
        id: editId,
        note: todo,
      };
      const edited = await API.graphql(graphqlOperation(updateTodo, { input }));
      let newData = edited.data.updateTodo;
      let todoArr = [...toDoList];
      let indx = todoArr.indexOf(editObj);
      todoArr[indx] = newData;
      this.setState({
        toDoList: todoArr,
      });
    }
  };
  handleChange = (e) => {
    this.setState({
      todo: e.target.value,
    });
  };
  handleEdit = (item) => {
    this.setState({
      todo: item.note,
      editId: item.id,
      editObj: item,
    });

    console.log(item);
  };
  handleDelete = async (item) => {
    let { todo, toDoList } = this.state;
    let todoArr = [...toDoList];

    let input = {
      id: item.id,
    };
    const result = await API.graphql(graphqlOperation(deleteTodo, { input }));
    let neArr = todoArr.filter((elem) => elem.id !== result.data.deleteTodo.id);
    console.log(neArr);
    this.setState({
      toDoList: neArr,
    });
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
                      onClick={() => {
                        this.handleDelete(item);
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
