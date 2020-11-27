import PropTypes from "prop-types"
import React from "react"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"

export const LocationRow = ({ id, name }) => {
  return (
    <TableRow key={id}>
      <TableCell component="th" scope="row">
        <span>{id}</span>
      </TableCell>
      <TableCell align="right">{name}</TableCell>
    </TableRow>
  )
}

LocationRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.number.isRequired,
}
