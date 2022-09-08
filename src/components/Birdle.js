import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
// import currentGuess from "../hooks/useWordle";
import Confetti from 'react-confetti';


export default function Birdle({ solution, call }) {
    const {currentGuess, guesses, handleKeyUp, isCorrect, turn} = useWordle(solution);
    // const {(500), (500) } = useWindowSize()
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)
        
        return () => {
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyUp])


    return (
        <div>
        {/* historical Guesses */}
        {
        guesses.map((formattedGuess, guessNumber) => {
            return (<div className="flex-row">
                {formattedGuess.map((letter, letterNumber) => {
                    return <div key={turn * letterNumber} className={"letter-space " + letter.color}><p>{letter.key}</p></div> })}
            </div>)
            }
        )}
        {/* Current Guess */}
            <div className="flex-row">
                {solution.split('').map((letter, i) => { return <div key={turn * i} className="letter-space"><p>{currentGuess[i]}</p></div>})}
            </div>
        
        {/* // Confetti */}

        {isCorrect && 
            <Confetti
                width="2000"
                height="2000"
            />
        }
        </div>
        );
    }