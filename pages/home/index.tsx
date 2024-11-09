import React, { useState, useEffect } from 'react';

type Player = 'X' | 'O' | null;

const Home = () => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [score, setScore] = useState(0);
    const [winStreak, setWinStreak] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [wordEnd, setWordEnd] = useState('');

    const handleClick = (index: number) => {
        if (board[index] || !isPlayerTurn || gameOver) return;

        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);
        setIsPlayerTurn(false);
    };

    const checkWinner = (board: Player[]): Player | 'draw' | null => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return board.every(cell => cell) ? 'draw' : null;
    };

    const minimax = (board: Player[], depth: number, isMaximizing: boolean): number => {
        const winner = checkWinner(board);
        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (winner === 'draw') return 0;

        if (depth > 2) {
            return Math.random() * 10 - 5;
        }

        if (isMaximizing) {
            let maxEval: number = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (!board[i]) {
                    board[i] = 'O';
                    const evaluation: number = minimax(board, depth + 1, false);
                    board[i] = null;
                    maxEval = Math.max(maxEval, evaluation);
                }
            }
            return maxEval;
        } else {
            let minEval: number = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (!board[i]) {
                    board[i] = 'X';
                    const evaluation: number = minimax(board, depth + 1, true);
                    board[i] = null;
                    minEval = Math.min(minEval, evaluation);
                }
            }
            return minEval;
        }
    };

    const getBestMove = () => {
        let bestMove = -1;
        let bestValue = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = 'O';
                const moveValue = minimax(board, 0, false);
                board[i] = null;
                if (moveValue > bestValue) {
                    bestValue = moveValue;
                    bestMove = i;
                }
            }
        }

        // ให้บอททำการสุ่มตำแหน่งเมื่อถึงเวลา
        if (Math.random() < 0.2) {  // 20% โอกาสในการทำผิดพลาด
            const emptyCells = board.map((value, index) => value === null ? index : -1).filter(index => index !== -1);
            bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        return bestMove;
    };

    const handleBotTurn = () => {
        const bestMove = getBestMove();
        if (bestMove !== -1) {
            const newBoard = [...board];
            newBoard[bestMove] = 'O';
            setBoard(newBoard);
            setIsPlayerTurn(true);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true);
        setGameOver(false);
    };

    useEffect(() => {
        if (gameOver) return
        const winner = checkWinner(board);

        if (winner) {
            if (winner === 'X') {
                setScore(prev => prev + 1);
                setWinStreak(prev => prev + 1);

                if (winStreak + 1 === 3) {
                    setScore(prev => prev + 1);
                    setWinStreak(0);
                }
                setWordEnd('You win!')
            } else if (winner === 'O') {
                setScore(prev => prev - 1);
                setWinStreak(0);
                setWordEnd('Game Over!')
            } else if (winner === 'draw') {
                setWinStreak(0);
                setWordEnd('draw')
            }
            setGameOver(true);
        } else if (!isPlayerTurn && !gameOver) {
            handleBotTurn();
        }
    }, [board, isPlayerTurn, gameOver, winStreak]);

    return (
        <div className="flex flex-col items-center space-y-4 bg-gradient-to-r from-[#039ae5] via-[#28b5f6] to-[#b3e5fc] w-full h-full justify-center">
            <h1 className="text-2xl font-bold">Tic-Tac-Toe (OX Game)</h1>
            <div className="grid grid-cols-3 gap-2">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className="w-20 h-20 text-2xl border-2 border-gray-400"
                        onClick={() => handleClick(index)}
                        disabled={gameOver}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            <p className="text-lg">Score: {score}</p>
            <p className="text-lg">Win Streak: {winStreak}</p>
            {gameOver && (
                <div className="mt-4">
                    <p className="text-lg font-semibold text-center">{wordEnd}</p>
                    <button
                        onClick={resetGame}
                        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Play More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
