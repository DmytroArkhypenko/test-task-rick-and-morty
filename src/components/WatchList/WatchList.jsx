/* eslint-disable react/no-array-index-key */
import React, { Component } from "react"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import ClearAllIcon from "@material-ui/icons/ClearAll"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import Box from "@material-ui/core/Box"
import Todo from "./Todo"
import "./WatchList.css"

export class WatchList extends Component {
  constructor() {
    super()
    this.state = {
      todo: "",
      todosArr: [],
      empty: false,
    }
  }

  componentDidMount() {
    const data = localStorage.getItem("todo")

    if (data !== null) {
      this.setState({ todosArr: JSON.parse(data) })
    }
  }

  handleChange = (event) => {
    this.setState({ empty: false })
    this.setState({ todo: event.target.value })
  }

  addTodo = () => {
    const { todo, todosArr } = this.state

    if (todo.length > 0) {
      this.setState({
        todosArr: [...todosArr, { todo, done: false }],
      })
      setTimeout(() => {
        localStorage.setItem("todo", JSON.stringify(todosArr))
      }, 500)
      this.setState({ todo: "" })
    } else {
      this.setState({ empty: true })
    }
  }

  removeTodo = (index) => {
    const { todosArr } = this.state
    const array = [...todosArr]
    array.splice(index, 1)
    this.setState({ todosArr: array })

    setTimeout(() => {
      localStorage.setItem("todo", JSON.stringify(todosArr))
    }, 500)
  }

  deleteAll = () => {
    // eslint-disable-next-line no-alert
    const del = window.confirm("Delete Todos?")
    if (del) {
      this.setState({ todosArr: [] })
      localStorage.clear()
    }
  }

  markDone = (index) => {
    const { todosArr } = this.state
    const data = todosArr
    data[index].done = !data[index].done

    this.setState({
      todosArr: data,
    })

    setTimeout(() => {
      localStorage.setItem("todo", JSON.stringify(todosArr))
    }, 500)
  }

  keyPress = (event) => {
    if (event.key === "Enter") {
      this.addTodo()
    }
  }

  render() {
    const { todo, todosArr, empty } = this.state

    return (
      <div className="container">
        <div className="header">
          <IconButton
            className="delete"
            title="Clear List"
            onClick={this.deleteAll}
            aria-label="delete"
          >
            <ClearAllIcon style={{ fill: "white" }} fontSize="large" />
          </IconButton>
        </div>

        <div className="inputField">
          <TextField
            className="input"
            error={empty}
            value={todo}
            id="outlined-basic"
            label={empty ? "Add ToWatch" : "ToWatch"}
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
              <AddCircleIcon style={{ fill: "#4bd863" }} fontSize="large" />
            </IconButton>
          </Box>
        </div>

        {todosArr.map((item, i) => {
          return (
            <Todo
              removeTodo={this.removeTodo}
              key={i}
              index={i}
              markDone={this.markDone}
              done={item.done}
              todo={item.todo}
            />
          )
        })}
      </div>
    )
  }
}
