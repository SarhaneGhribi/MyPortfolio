// pages/TicTacToe.tsx
"use client";
import { useState } from "react";

type Player = "X" | "O" | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const calculateWinner = (board: Player[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 rounded-lg">
      <h1 className="text-3xl font-bold mb-3">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 flex items-center justify-center bg-white border border-gray-300 text-2xl font-bold cursor-pointer rounded-lg margin-20 shadow-md transition-transform transform hover:scale-105"
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-4">
          <p className="text-xl font-semibold">Player {winner} wins!</p>
        </div>
      )}
      {!winner && board.every((cell) => cell) && (
        <div className="mt-4">
          <p className="text-xl font-semibold">It is a draw!</p>
        </div>
      )}
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Restart Game
      </button>
    </div>
  );
}
