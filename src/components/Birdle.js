import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
// import currentGuess from "../hooks/useWordle";
import Confetti from 'react-confetti';
import { ToastContainer, toast } from 'react-toastify';

export default function Birdle({ solution, call }) {
    const { currentGuess, guesses, handleKeyUp, isCorrect, turn } = useWordle(solution);
    // const {(500), (500) } = useWindowSize()
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyUp])


    return (
        <div>
            <ToastContainer />
            {/* historical Guesses */}
            {
                guesses.map((formattedGuess, guessNumber) => {
                    return (<div className="flex-row">
                        {formattedGuess.map((letter, letterNumber) => {
                            return <div key={(turn * letterNumber).toString()} className={"letter-space " + letter.color}><p>{letter.key}</p></div>
                        })}
                    </div>)
                }
                )}
            {/* Current Guess */}
            {!isCorrect &&
                <div className="flex-row">
                    {solution.split('').map((letter, i) => { return <div key={i.toString()} className="letter-space"><p>{currentGuess[i]}</p></div> })}
                </div>
            }

            {/* Confetti */}

            {isCorrect &&
                <>
                    <div className="confetti-wrapper">
                        <Confetti />
                    </div>
                </>
            }
        </div>
    );
}