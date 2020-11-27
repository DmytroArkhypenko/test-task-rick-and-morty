/* eslint-disable react/prop-types */
import React, { Component } from "react"
import "./Todo.css"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

class Todo extends Component {
  constructor({ done, index, markDone, todo, removeTodo }) {
    super({ done, index, markDone, todo, removeTodo })
    this.state = {
      hover: false,
    }
  }

  showBin = () => {
    this.setState({ hover: true })
  }

  hideBin = () => {
    this.setState({ hover: false })
  }

  render() {
    const { done, index, markDone, todo, removeTodo } = this.props
    const { hover } = this.state
    return (
      <div>
        <p
          onMouseLeave={this.hideBin}
          onMouseEnter={this.showBin}
          className={done ? "finished" : null}
        >
          <span className="text-color">
            <Checkbox
              title="Mark Done"
              onClick={() => markDone(index)}
              checked={done}
              color="primary"
            />
            {todo}
          </span>
          {hover && (
            <IconButton
              title="Remove Todo"
              color="secondary"
              onClick={() => removeTodo(index)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </p>
        <hr />
      </div>
    )
  }
}

export default Todo
