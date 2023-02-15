import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import './TicTacToe.scss'


const TicTacToe = () => {
    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')
    const [buttonName, setButtonName] = useState('Start')
    const [isClick, setIsClick] = useState(false)
    const [winnierAnnounced, setWinnerAnnounced] = useState(false)
    const [playerTurn, setPlayerTurn] = useState(false)
    const [data, setData] = useState(['', '', '', '', '', '', '', '', ''])
    const [scoreX, setScoreX] = useState(0)
    const [scoreO, setScoreO] = useState(0)

    const changePlayerName1 = (e) => {
        setPlayer1(e.target.value)
    }

    const changePlayerName2 = (e) => {
        setPlayer2(e.target.value)
    }

    const handleClickCell = (e, index) => {
        const cell = e.target
        const draw = playerTurn === false ? "X" : "O"

        if (data[index - 1] === '') {
            data[index - 1] = draw;
            e.target.innerText = draw
            setPlayerTurn(!playerTurn)
        }
    }

    const handleButtonClick = () => {
        console.log('button clicked')
        setIsClick(true)
    }

    useEffect(() => {

        //Checking Row 
        const checkRow = () => {
            let ans = false;
            for (let i = 0; i < 9; i += 3) {
                ans |= (data[i] === data[i + 1] && data[i] === data[i + 2] && data[i] !== '')
            }
            return ans;
        }

        //Checking Col
        const checkCol = () => {
            let ans = false;
            for (let i = 0; i < 3; i++) {
                ans |= (data[i] === data[i + 3] && data[i] === data[i + 6] && data[i] !== '')
            }
            return ans;
        }

        //Checking Tie
        const checkTie = () => {
            let count = 0;
            data.forEach((cell) => {
                if (cell !== '') {
                    count++;
                }
            })
            return count === 9;
        }

        //Checking Diagonal 
        const checkDiagonal = () => {
            return ((data[0] === data[4] && data[0] === data[8] && data[0] !== '') || (data[2] === data[4] && data[2] === data[6] && data[2] !== ''))
        }

        if (checkRow() !== 0) {
            const winnerPlayer = playerTurn === false ? "O" : "X"
            if (winnerPlayer === "O") {
                setScoreO(scoreO + 1)
            } else {
                setScoreX(scoreX + 1)
            }
            console.log(`${winnerPlayer} winner`)
            swal(`${winnerPlayer} winner`)
            setIsClick(false)
            setButtonName('Play again')
            setData(['', '', '', '', '', '', '', '', ''])
        }

        if (checkCol() !== 0) {
            const winnerPlayer = playerTurn === false ? "O" : "X"
            if (winnerPlayer === "O") {
                setScoreO(scoreO + 1)
            } else {
                setScoreX(scoreX + 1)
            }
            console.log(`${winnerPlayer} winner`)
            swal(`${winnerPlayer} winner`)
            setIsClick(false)
            setButtonName('Play again')
            setData(['', '', '', '', '', '', '', '', ''])
        }

        if (checkTie() === true) {
            console.log('Tie')
            swal(`Tie`)
            setIsClick(false)
            setButtonName('Play again')
            setData(['', '', '', '', '', '', '', '', ''])
        }

        if (checkDiagonal() === true) {
            const winnerPlayer = playerTurn === false ? "O" : "X"
            if (winnerPlayer === "O") {
                setScoreO(scoreO + 1)
            } else {
                setScoreX(scoreX + 1)
            }
            console.log(`${winnerPlayer} winner`)
            swal(`${winnerPlayer} winner`)
            setIsClick(false)
            setButtonName('Play again')
            setData(['', '', '', '', '', '', '', '', ''])
        }
    })

    return (
        <div className='box'>
            <div className='title-section'>Tic Tac Toe</div>
            <div className='player1-section'>
                <label>Player 1 : </label>
                <input type='text' name='player1' className='text-player1' value={player1} onChange={changePlayerName1} />
            </div>
            <div className='player2-section'>
                <label>Player 2 : </label>
                <input type='text' name='player2' className='text-player2' value={player2} onChange={changePlayerName2} />
            </div>
            {player1 && player2 ? <div>
                <button type='button' className='button' onClick={handleButtonClick}>{buttonName}</button>
            </div> : ''}


            {player1 && player2 ?
                <>
                    <div>Score </div>
                    <div>{player1} : {scoreX} {player2} : {scoreO}</div>
                </> : ''}

            {isClick &&
                <>
                    <div className='name-section'>
                        <div className='player1'><b>Player 1 : </b>{`${player1} 'X'`}</div>
                        <div className='player2'><b>Player 2 : </b>{`${player2} 'O'`}</div>
                    </div>
                    <div className='board'>
                        {data.map((cell, index) => (
                            <div className='cell' onClick={(e) => handleClickCell(e, index + 1)}></div>
                        ))}
                        {/* <div className='cell' onClick={(e) => handleClickCell(e, 1)}></div>
                        <div className='cell' onClick={(e) => handleClickCell(e, 2)}></div>
                        <div className='cell' onClick={(e) => handleClickCell(e, 3)}></div>
                        <div className='cell' onClick={(e) => handleClickCell(e, 4)}></div>
                        <div className='cell' onClick={(e) => handleClickCell(e, 5)}></div>
                        <div className='cell' onClick={(e) => handleClickCell(e, 6)}></div>
                        <div className='cell' onClick={(e) => handleClickCell(e, 7)}></div>
                        <div className='cell' onClick={(e) => handleClickCell(e, 8)}></div>
                        <div className='cell' onClick={(e) => handleClickCell(e, 9)}></div> */}
                    </div>

                </>}
            {winnierAnnounced && <div className='winning-message'>
                <div>Congratulations Player name is winner</div>
                <div onLoad={() => setButtonName('Play again')}></div>
            </div>}
        </div>
    )
}

export default TicTacToe