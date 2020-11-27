import React from 'react';
import Pagination from "@material-ui/lab/Pagination";
import GridList from "@material-ui/core/GridList";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useState, useEffect, useCallback } from 'react';
import { getCharacter } from '../../api/index';
import { Character } from "./Character";
import './Characters.css'

const SPECIES_LIST = ['unknown', 'human', 'alien', 'humanoid', 'animal', 'Robot', 'Cronenberg', 'Poopybutthole', 'Metholog', 'Vampire'];
const STATUS_LIST = ['alive', 'dead', 'unknown'];
const GENDER_LIST = ['male', 'female', 'genderless', 'unknown'];

export const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({})
  const [species, setSpecies] = useState('All');
  const [status, setStatus] = useState('All');
  const [gender, setGender] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getCharacter().then(result => {
      setCharacters(result.results);
      setInfo(result.info);
    });
  }, []);

  const fetchPage = (page) => {
    getCharacter({
      ...query,
      'page': page}).then(result => {
      setCharacters(result.results);
      setInfo(result.info);
    });
  }
  
  useEffect(() => {
    const speciesString = species === 'All' ? '' : species;
    const statusString = status === 'All' ? '' : status;
    const genderString = gender === 'All' ? '' : gender;

    const query =  {
      'species': speciesString,
      'status': statusString,
      'gender': genderString
    }
    setQuery(query)
    getCharacter(query).then(result => {
      setCharacters(result.results);
      setInfo(result.info);
    });
  }, [species, status, gender]);

  const onSpeciesChange = useCallback(
    (event) => {
      setSpecies(event.target.value)
    },
    [],
  )

  const onStatusChange = useCallback(
    (event) => {
      setStatus(event.target.value)
    },
    [],
  )

  const onGenderChange = useCallback(
    (event) => {
      setGender(event.target.value)
    },
    [],
  )

  return (
  <div>
    <div class='filters'>
      <div class="filter__item">
        <InputLabel id="species">Species</InputLabel>
        <Select
          id="species"
          native
          value={species}
          onChange={onSpeciesChange}
        >
          <option
            value='All'
            key='All'
          >
            ALL
          </option>
          {SPECIES_LIST.map(curSpecies => (
          <option
            value={curSpecies}
            key={curSpecies}
          >
            {curSpecies.toUpperCase()}
          </option>
          ))}
        </Select>
      </div>

      <div class="filter__item">
        <InputLabel id="status">Status</InputLabel>
          <Select
            id="status"
            native
            value={status}
            onChange={onStatusChange}
          >
          <option
            value='All'
            key='All'
          >
            ALL
          </option>
          {STATUS_LIST.map(curStatus => (
          <option
            value={curStatus}
            key={curStatus}
          >
            {curStatus.toUpperCase()}
          </option>
          ))}
        </Select>
      </div>

      <div class="filter__item">
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          id="gender"
          native
          value={gender}
          onChange={onGenderChange}
        >
          <option
            value='All'
            key='All'
          >
            ALL
          </option>
          {GENDER_LIST.map(curGender => (
            <option
              value={curGender}
              key={curGender}
            >
              {curGender.toUpperCase()}
            </option>
          ))}
        </Select>
      </div>
    </div>

    {characters !== undefined && info !== undefined &&
    <div>
      <div className="pagination">
        <Pagination
          count={info.pages}
          color="primary"
          showFirstButton 
          showLastButton 
          onChange={(event, page) => fetchPage(page)}
        ></Pagination>
      </div>
      <GridList>
        {characters.map((char) => (
        <Character
          key={char.id}
          char={char}
        ></Character>
        ))}
      </GridList>
    </div>}
  </div>
  )
};

