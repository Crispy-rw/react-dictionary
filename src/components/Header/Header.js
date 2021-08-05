import React from 'react';
import {
  TextField,
  createTheme,
  ThemeProvider,
  MenuItem
} from '@material-ui/core';
import categories from '../../data/category.js';
import './Header.css';

const Header = ({ category, setCategory, word, setWord }) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      type: 'dark'
    }
  });

  const handleChange = e => {
    setCategory(e.target.value);
    setWord('');
    setMeanings([]);
  };

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
            onChange={e => setWord(e.target.value)}
          />
          <TextField
            select
            label="Language"
            value={category}
            onChange={e => setCategory(e.target.value)}
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
