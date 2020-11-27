import React, { Component } from "react";
import "./Todo.css";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  showBin = () => {
    this.setState({ hover: true });
  };

  hideBin = () => {
    this.setState({ hover: false });
  };

  render() {
    return (
      <div>
        <p
          onMouseLeave={this.hideBin}
          onMouseEnter={this.showBin}
          className={this.props.done ? "finished" : null}
        >
          <span className='text-color'>
            <Checkbox
              title="Mark Done"
              onClick={() => this.props.markDone(this.props.index)}
              checked={this.props.done}
              color="primary"
            />
            {this.props.todo}
          </span>
          {this.state.hover && (
            <IconButton
              title="Remove Todo"
              color="secondary"
              onClick={() => this.props.removeTodo(this.props.index)}
              aria-label="delete">
              <DeleteIcon />
            </IconButton>
          )}
        </p>
        <hr />
      </div>
    );
  }
}

export default Todo;