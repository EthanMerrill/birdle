import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Birdle from './components/Birdle';

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/solutions')
      .then(res => res.json())
      .then(json => {
        //random int between 0 & 14
        const random = Math.floor(Math.random() * 5);

        setSolution(json[random]);     
      })
  },[setSolution])


  return (
    <div className="App">
      <h1>BIRDLE 🦆</h1>
      <h2>Find the solution to the puzzle</h2>{solution && <Birdle solution = {solution.word}></Birdle>}
    </div>
  );
}

export default App;
