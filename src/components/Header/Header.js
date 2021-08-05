import React from 'react';
import {
  TextField,
  createTheme,
  ThemeProvider,
  MenuItem
} from '@material-ui/core';
import categories from '../../data/category.js';
import { debounce } from 'lodash';

import './Header.css';

const Header = ({
  category,
  setCategory,
  word,
  setWord,
  lightMode,
  setMeanings
}) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightMode ? '#000' : '#fff'
      },
      type: lightMode ? 'light' : 'dark'
    }
  });

  const handleChange = e => {
    setCategory(e.target.value);
    setWord('');
    setMeanings([]);
  };

  const handleText = debounce(text => {
    setWord(text);
  }, 500);

  return (
    <div className="header">
      <span className="title">{word ? word : 'Word Hunt'}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            id="filled-basic"
            // value={word}
            label="Search a Word"
            onChange={e => handleText(e.target.value)}
          />
          <TextField
            select
            label="Language"
            value={category}
            onChange={e => handleChange(e)}
            className="select"
          >
            {categories.map(option => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
