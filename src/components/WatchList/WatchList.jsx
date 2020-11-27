import React, { Component } from "react";
import Todo from "./Todo";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Box from "@material-ui/core/Box";
import "./WatchList.css";

export class WatchList extends Component {
  constructor() {
    super();
    this.state = {
      todo: "",
      todosArr: [],
      empty: false,
    };
  }

  componentDidMount() {
    let data = localStorage.getItem("todo");

    if (data !== null) {
      this.setState({ todosArr: JSON.parse(data) });
    }
  }

  handleChange = (event) => {
    this.setState({ empty: false });
    this.setState({ todo: event.target.value });
  };

  addTodo = () => {
    if (this.state.todo.length > 0) {
      this.setState({ todosArr: [...this.state.todosArr, { todo: this.state.todo, done: false }] });
      setTimeout(() => {
        localStorage.setItem("todo", JSON.stringify(this.state.todosArr));
      }, 500);
      this.setState({ todo: "" });
    } else {
      this.setState({ empty: true });
    }
  };

  removeTodo = (index) => {
    const array = [...this.state.todosArr];
    array.splice(index, 1);
    this.setState({ todosArr: array });

    setTimeout(() => {
      localStorage.setItem("todo", JSON.stringify(this.state.todosArr));
    }, 500);
  };

  deleteAll = () => {
    let del = window.confirm("Delete Todos?");
    if (del) {
      this.setState({ todosArr: [] });
      localStorage.clear();
    }
  };

  markDone = (index) => {
    let data = this.state.todosArr;
    data[index].done = !data[index].done;

    this.setState({
      todosArr: data,
    });

    setTimeout(() => {
      localStorage.setItem("todo", JSON.stringify(this.state.todosArr));
    }, 500);
  };

  keyPress = (event) => {
    if (event.key === "Enter") {
      this.addTodo();
    }
  };

  render() {
    return (
      <div className="container">
        <div className="header">
          <IconButton
          className="delete"
          title="Clear List"
          onClick={this.deleteAll}
          aria-label="delete"
          >
            <ClearAllIcon
              style={{ fill: "white" }}
              fontSize="large" />
          </IconButton>
        </div>

        <div className="inputField">
          <TextField
            className="input"
            error={this.state.empty}
            value={this.state.todo}
            id="outlined-basic"
            label={this.state.empty ? "Add ToWatch" : "ToWatch"}
            variant="outlined"
            onKeyPress={this.keyPress}
            onChange={this.handleChange}
          />
          <Box ml={0.5}>
            <IconButton
              title="Add ToWatch"
              className="add"
              onClick={this.addTodo}
              aria-label="delete"
            >
              <AddCircleIcon
                style={{ fill: "#4bd863" }}
                fontSize="large" />
            </IconButton>
          </Box>
        </div>
        
        {this.state.todosArr.map((item, i) => {
          return <Todo
                    removeTodo={this.removeTodo}
                    key={i}
                    index={i}
                    markDone={this.markDone}
                    done={item.done}
                    todo={item.todo}
                />;
        })}
      </div>
    );
  }
}