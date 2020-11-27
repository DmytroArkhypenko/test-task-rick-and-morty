import React from 'react';
import Pagination from "@material-ui/lab/Pagination";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { EpisodeRow } from './EpisodeRow'
import { useState, useEffect } from 'react';
import { fade, makeStyles } from "@material-ui/core/styles";
import { getEpisode } from '../../api';
import './Episodes.css'

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    backgroundColor: "#40E0D0",
  },
  table: {
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
  pagination: {
    margin: 20,
  },
}));

export const Episodes = () => {
  const classes = useStyles();
  const [episodes, setEpisodes] = useState([]);
  const [info, setInfo] = useState({})
  const [query, setQuery] = useState({});

  useEffect(() => {
    getEpisode(query).then(result => {
      setEpisodes(result.results);
      setInfo(result.info);
    });
  }, [query]);

  const changeQueryToSearch = (value) => {
    setQuery({
      'name': value
    });
    getEpisode(query).then(result => {
      setEpisodes(result.results);
      setInfo(result.info);
    });
  };

  const fetchPage = (page) => {
    getEpisode({
      ...query,
      'page': page}).then(result => {
      setEpisodes(result.results);
      setInfo(result.info);
    });
  };

  return(
  <div className="episodes">
    <Toolbar>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={(e) => {
            changeQueryToSearch(e.target.value)}}
          placeholder="Search Episodes"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          fullWidth={true}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </Toolbar>

    {episodes !== undefined && info !== undefined &&
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
              {episodes.map((episode) => (
                <EpisodeRow
                  key={episode.id}
                  episode={episode}
                ></EpisodeRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    }
  </div>
  );
  };
