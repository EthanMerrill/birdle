import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
// import currentGuess from "../hooks/useWordle";

export default function Birdle({ solution }) {
    const {currentGuess, guesses, handleKeyUp} = useWordle(solution);
    console.log(guesses)
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)
        
        return () => {
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyUp])


    return (
        <div>
        <h3>{solution}</h3>
        {/* historical Guesses */}
        {
        guesses.map((formattedGuess, guessNumber) => {
            return (<div className="flex-row">
                {formattedGuess.map((letter, letterNumber) => {
                    return <div className={"letter-space " + letter.color}>{letter.key}</div> })}
            </div>)
            }
        )}
        {/* Current Guess */}
            <div className="flex-row">
                {solution.split('').map((letter, i) => {return <div className="letter-space">{currentGuess[i]}</div>})}
            </div>
        </div>
        );
    }