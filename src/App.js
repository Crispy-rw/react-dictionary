import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Container, withStyles, Switch } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import './style.css';

import Header from './components/Header/Header.js';
import Definitions from './components/Definitions/Definitions.js';

export default function App() {
  const [meanings, setMeanings] = useState([]);
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('en');
  const [lightMode, setLightMode] = useState(false);

  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500]
      },
      '&$checked + $track': {
        backgroundColor: grey[500]
      }
    },
    checked: {},
    track: {}
  })(Switch);

  const dictionaryApi = async () => {
    try {
      const data = await Axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dictionaryApi();
  }, [word, category]);

  return (
    <div
      className="App"
      style={{
        height: '100vh',
        color: lightMode ? 'black' : 'white',
        backgroundColor: lightMode ? '#fff' : '#282c34',
        transition: 'all 0.5s linear'
      }}
    >
      <div style={{ position: 'absolute', top: 0, right: 15, paddingTop: 10 }}>
        <span>{lightMode ? 'Dark' : 'Light'} mode</span>
        <DarkMode
          checked={lightMode}
          onChange={() => setLightMode(!lightMode)}
        />
      </div>
      <Container
        maxWidth="md"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'space-evenly'
        }}
      >
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          lightMode={lightMode}
          setMeanings={setMeanings}
        />
        {meanings && (
          <Definitions
            word={word}
            meanings={meanings}
            category={category}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  );
}
