import PropTypes from "prop-types"
import React from "react"
import Modal from "@material-ui/core/Modal"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { makeStyles } from "@material-ui/core/styles"

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    color: "black",
  }
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export const EpisodeRow = ({ episode }) => {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <TableRow key={episode.id} onClick={handleOpen}>
        <TableCell component="th" scope="row">
          <span>{episode.id}</span>
        </TableCell>
        <TableCell align="right">{episode.name}</TableCell>
      </TableRow>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>{episode.name}</h2>
          <p>
            <b>Id</b>: {episode.id} <br />
            <b>Air date</b>: {episode.air_date} <br />
            <b>Episode</b>: {episode.episode} <br />
          </p>
        </div>
      </Modal>
    </>
  )
}

EpisodeRow.propTypes = {
  episode: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    air_date: PropTypes.string.isRequired,
    episode: PropTypes.string.isRequired,
  }),
}
