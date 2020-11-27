import React from 'react';
import Pagination from "@material-ui/lab/Pagination";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { LocationRow } from './LocationRow'
import { useState, useEffect, useCallback } from 'react';
import { fade, makeStyles } from "@material-ui/core/styles";
import { getLocation } from '../../api';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    backgroundColor: "#40E0D0",
  },
  table: {
    color: "white",
    maxWidth: 400,
    margin: "auto",
    backgroundColor: "#40E0D0",
  },
  search: {
    color: "#3f51b5",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: "auto",
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#3f51b5",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "80%",
  },
  button: {

  },
  pagination: {
    margin: 20,
  },
}));

const DIMENSIONS = ["unknown", "Dimension C-137", "Post-Apocalyptic Dimension", "Replacement Dimension", "Cronenberg Dimension", "Fantasy Dimension", "Dimension 5-126"];
const TYPES = ["Planet", "Cluster", "Space station", "Microverse", "TV", "Resort", "Fantasy town", "Dream"];

export const Locations = () => {
  const classes = useStyles();
  const [locations, setLocations] = useState([]);
  const [info, setInfo] = useState({})
  const [query, setQuery] = useState({});
  const [name, setName] = useState('');
  const [type, setType] = useState('All');
  const [dimension, setDimension] = useState('All');

  useEffect(() => {
    getLocation().then(result => {
      setLocations(result.results);
      setInfo(result.info);
    });
  }, []);

  useEffect(() => {
    const nameString = name === 'All' ? '' : name;
    const dimensionString = dimension === 'All' ? '' : dimension;
    const typeString = type === 'All' ? '' : type;

      const query =  {
        'name': nameString,
        'dimension': dimensionString,
        'type': typeString
      }
      setQuery(query)
      getLocation(query).then(result => {
        setLocations(result.results);
        setInfo(result.info);
      });
    }, [name, type, dimension]);

  const fetchPage = (page) => {
    getLocation({
      ...query,
      'page': page}).then(result => {
      setLocations(result.results);
      setInfo(result.info);
    });
  }

  const onTypeChange = useCallback(
    (event) => {
      setType(event.target.value)
    },
    [],
  )

  const onDimensionChange = useCallback(
    (event) => {
      setDimension(event.target.value)
    },
    [],
  );

  const onNameChange = useCallback(
    (value) => {
      setName(value)
    },
    [],
  );

  return(
    <>
      <div class='filters'>
        <div class="filter__item">
          <TextField
            id="standard-search"
            label="Search field"
            type="search"
            onChange={e => onNameChange(e.target.value)}/>
        </div>
        <div class="filter__item">
          <InputLabel id="type">Type</InputLabel>
            <Select
              id="type"
              native
              value={type}
              onChange={onTypeChange}
            >
            <option
              value='All'
              key='All'
            >
              ALL
            </option>
            {TYPES.map(curType => (
            <option
              value={curType}
              key={curType}
            >
              {curType.toUpperCase()}
            </option>
            ))}
          </Select>
        </div>
        <div class="filter__item">
          <InputLabel id="dimension">Dimension</InputLabel>
          <Select
            id="dimension"
            native
            value={dimension}
            onChange={onDimensionChange}
          >
            <option
              value='All'
              key='All'
            >
              ALL
            </option>
            {DIMENSIONS.map(curDimension => (
              <option
                value={curDimension}
                key={curDimension}
              >
                {curDimension.toUpperCase()}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {locations !== undefined && info !== undefined &&
        <div>
          <div className="pagination">
            <Pagination
                className={classes.pagination}
                count={info.pages}
                color="primary"
                showFirstButton 
                showLastButton 
                onChange={(event, page) => fetchPage(page)}
            ></Pagination>
          </div>
          <TableContainer
            component={Paper}
            className={classes.tableContainer}
          >
            <Table
              className={classes.table}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Id</b>
                  </TableCell>
                  <TableCell
                    align="right"
                  >
                    <b>Name</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations.map((location) => (
                  <LocationRow
                    key={location.id}
                    location={location}
                  ></LocationRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    </>
  );
};

