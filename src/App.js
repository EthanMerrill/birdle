import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Birdle from './components/Birdle';
import ReactAudioPlayer from 'react-audio-player';

function App() {
  const [solution, setSolution] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/solutions')
      .then(res => res.json())
      .then(json => {
        //random int between 0 & 14
        const random = Math.floor(Math.random() * 5);

        setSolution(json[random]);  
        console.log(`the solution is ${json[random].word}, cheater!`)   
      })
  },[setSolution])


  return (
    <div className="App">
      <h1>BIRDLE 🦆</h1>
      <h2><i>Guess That Bird!</i></h2>


      {solution && 
      <>
      <ReactAudioPlayer
        src={solution.call}
        autoPlay
        controls
      />
      <Birdle solution = {solution.word} ></Birdle>
      </>
      }
    </div>
  );
}

export default App;
