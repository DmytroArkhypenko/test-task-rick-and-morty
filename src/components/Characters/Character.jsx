import PropTypes from "prop-types"
import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import { makeStyles } from "@material-ui/core/styles"
import { GridListTile, GridListTileBar } from "@material-ui/core"

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    color: "black",
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "10rem",
    width: "10rem",
    objectFit: "cover",
    margin: "1rem",
    transition: "transform 0.5s",
    "&:hover": {
      boxShadow: "0 10px 10px rgba(88, 176, 192, 0.8)",
    },
  },
  paper: {
    position: "absolute",
    display: "block",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export const Character = ({ char }) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div className="grid-list">
        <GridListTile
          key={char.image}
          className={classes.root}
          onClick={handleOpen}
        >
          <img src={char.image} alt={char.name} title={char.name} />
          <GridListTileBar title={char.name} />
        </GridListTile>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>{char.name}</h2>
          <img src={char.image} alt="NoPic" />
          <p>
            <b>Id</b>: {char.id}
          </p>
          <p>
            <b>Status</b>: {char.status}
          </p>
          <p>
            <b>Species</b>: {char.species}
          </p>
          <p>
            <b>Gender</b>: {char.gender}
          </p>
          <p>
            <b>Location</b>: {char.location.name}
          </p>
        </div>
      </Modal>
    </>
  )
}

Character.propTypes = {
  char: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.element.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
}
