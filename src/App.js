import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Container } from '@material-ui/core';
import './style.css';

import Header from './components/Header/Header.js';

export default function App() {
  const [meanings, setMeanings] = useState([]);
  const [word, setWord] = useState();
  const [category, setCategory] = useState('en');

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
      style={{ height: '60vh', color: 'white', backgroundColor: '#282c34' }}
    >
      <Container
        maxWidth="md"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
        />
      </Container>
    </div>
  );
}
