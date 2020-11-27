/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"

export const LocationRow = ({ location }) => {
  return (
    <>
      <TableRow key={location.id}>
        <TableCell component="th" scope="row">
          <span>{location.id}</span>
        </TableCell>
        <TableCell align="right">{location.name}</TableCell>
      </TableRow>
    </>
  )
}
