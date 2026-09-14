"use client";
import Image from "next/image";
import { useState, CSSProperties } from "react";
import confetti from "canvas-confetti";

type Player = "React Native" | "Flutter" | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("React Native");
  const [winner, setWinner] = useState<Player>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === "React Native") {
        celebrate();
      }
    } else {
      setCurrentPlayer(
        currentPlayer === "React Native" ? "Flutter" : "React Native"
      );
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
    setCurrentPlayer("React Native");
    setWinner(null);
  };

  const getImageForPlayer = (player: Player) => {
    if (player === "React Native") return "/react-native.png";
    if (player === "Flutter") return "/flutter.png";
    return null;
  };

  const celebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
    });
  };

  const styles: Record<string, CSSProperties> = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#e3f2fd",
      borderRadius: "8px",
      backgroundImage: 'url("/codebg.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "black",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 75px)",
      gap: "10px",
      padding: "10px",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "10px",
    },
    cell: {
      width: "65px",
      height: "65px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "8px",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s",
    },
    cellHover: {
      transform: "scale(1.05)",
    },
    message: {
      marginTop: "20px",
      textAlign: "center",
      fontSize: "18px",
      fontWeight: "bold",
      color: "white",
    },

    button: {
      marginTop: "10px",
      padding: "8px 16px",
      backgroundColor: "white",
      color: "#27B3F0",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#1976d2",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <Image
          src={"/rvsf.png"}
          alt="reactvs flutter"
          height={150}
          width={450}
        />
      </div>
      <div style={styles.grid}>
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              ...styles.cell,
              ...(cell && styles.cellHover),
            }}
          >
            {cell && (
              <Image
                src={getImageForPlayer(cell)!}
                alt={cell}
                width={60}
                height={60}
              />
            )}
          </div>
        ))}
      </div>
      {winner && (
        <div style={styles.message}>
          <h3>{winner} wins!</h3>
          <button onClick={resetGame} style={styles.button}>
            Restart Game
          </button>
        </div>
      )}
      {!winner && board.every((cell) => cell) && (
        <div style={styles.message}>
          <h3>It is a draw!</h3>
          <button onClick={resetGame} style={styles.button}>
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}
