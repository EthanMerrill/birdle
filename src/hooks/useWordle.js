import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)



    //format a guess into an array of letter objects
    // each letter will have a key and a color property 
    // the key will be the letter and the color will be the color of the letter
    const formatGuess = (guess) => {
        console.log("formatting guess")
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l)=>{
            return {key: l, color: 'gray'}
        })

        formattedGuess.forEach((l, i)=>{
            if(solutionArray[i] === l.key){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }else if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[i] = null
            }
        })

        return formattedGuess;
    }

    // add a new guess to the guesses state
    // update the isCorrect state if guess is correct]
    // add one to the turn state
    const addGuess = (guess) => {
        const formattedGuess = formatGuess(guess);
        console.log(formattedGuess);
        setGuesses([...guesses, formattedGuess]);
        setIsCorrect(guess === solution);
        setTurn(turn + 1);
    }

    // handle keyup event and track current guess 
    // if user presses enter, add the new guess
    const handleKeyUp = ({key}) => {
        if(/^[A-Za-z]$/.test(key) && currentGuess.length<solution.length){
            setCurrentGuess(currentGuess + key)
        } else if (key === 'Backspace'){
            setCurrentGuess(currentGuess.slice(0, -1))
        } else if (key === 'Enter'){
            // only add a guess if the turn is less than 5 and the user has typed something
            if(turn < 5 && currentGuess !== '' && solution.length === currentGuess.length ){
                addGuess(currentGuess);
                setHistory([...history, currentGuess]);
                setCurrentGuess('');
                if(currentGuess===solution){
                    isCorrect(true)
                }
            }else{
                console.log('Invalid guess')
            }

        }
    }
    return {turn, currentGuess, guesses, isCorrect, handleKeyUp}

}

export default useWordle;