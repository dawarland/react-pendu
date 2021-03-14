import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import PartyComponent from "./PartyComponent";

function App() {
    const [word, setWord] = useState(null);
    const [chosenWord, setChosenWord] = useState("");
    const [tries, setTries] = useState(new Set([]));
    const [play, setPlay] = useState(false);

    const startGame = () => {
        setWord(chosenWord);
        setPlay(true);
    }
    const print = ({key}) => {
        if(play && key.match(/^[A-z]$/)){
            let newSet = new Set([... tries.add( key.toUpperCase() )]);
            setTries(newSet);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', print);
        return () => {
            window.removeEventListener('keydown', print);
        };
    }, [play]);

    function chooseGameMode(){
        return (
            <div className="party">
                    <input placeholder="Mot à trouver" value={chosenWord} onChange={e => setChosenWord(e.target.value.toUpperCase())}/>
                    <button onClick={() => startGame()}>Jouer</button>
            </div>
        )
    }
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        {word ? <PartyComponent word={word} tries={tries} /> : chooseGameMode() }

    </div>
  );
}

export default App;
