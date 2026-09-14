"use client";
import React, { useState } from "react";

type Operator = "+" | "-" | "×" | "÷";

function compute(a: number, b: number, op: Operator): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
  }
}

function formatValue(value: number): string {
  if (Number.isNaN(value)) return "Error";
  const rounded = Math.round(value * 1e10) / 1e10;
  return rounded.toString().slice(0, 12);
}

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [pendingValue, setPendingValue] = useState<number | null>(null);
  const [pendingOperator, setPendingOperator] = useState<Operator | null>(null);
  const [awaitingOperand, setAwaitingOperand] = useState(false);

  function inputDigit(digit: string) {
    if (awaitingOperand) {
      setDisplay(digit);
      setAwaitingOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  }

  function inputDecimal() {
    if (awaitingOperand) {
      setDisplay("0.");
      setAwaitingOperand(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  }

  function clearAll() {
    setDisplay("0");
    setPendingValue(null);
    setPendingOperator(null);
    setAwaitingOperand(false);
  }

  function toggleSign() {
    setDisplay((current) =>
      current.startsWith("-") ? current.slice(1) : "-" + current
    );
  }

  function inputPercent() {
    setDisplay(formatValue(parseFloat(display) / 100));
  }

  function applyOperator(nextOperator: Operator | "=") {
    const inputValue = parseFloat(display);

    if (pendingOperator && pendingValue !== null && !awaitingOperand) {
      const result = compute(pendingValue, inputValue, pendingOperator);
      setDisplay(formatValue(result));
      setPendingValue(nextOperator === "=" ? null : result);
    } else {
      setPendingValue(inputValue);
    }

    setAwaitingOperand(true);
    setPendingOperator(nextOperator === "=" ? null : nextOperator);
  }

  const buttons: { label: string; onClick: () => void; className?: string }[] = [
    { label: "AC", onClick: clearAll, className: "bg-gray-400 text-black" },
    { label: "+/-", onClick: toggleSign, className: "bg-gray-400 text-black" },
    { label: "%", onClick: inputPercent, className: "bg-gray-400 text-black" },
    { label: "÷", onClick: () => applyOperator("÷"), className: "bg-orange-500" },
    { label: "7", onClick: () => inputDigit("7") },
    { label: "8", onClick: () => inputDigit("8") },
    { label: "9", onClick: () => inputDigit("9") },
    { label: "×", onClick: () => applyOperator("×"), className: "bg-orange-500" },
    { label: "4", onClick: () => inputDigit("4") },
    { label: "5", onClick: () => inputDigit("5") },
    { label: "6", onClick: () => inputDigit("6") },
    { label: "-", onClick: () => applyOperator("-"), className: "bg-orange-500" },
    { label: "1", onClick: () => inputDigit("1") },
    { label: "2", onClick: () => inputDigit("2") },
    { label: "3", onClick: () => inputDigit("3") },
    { label: "+", onClick: () => applyOperator("+"), className: "bg-orange-500" },
    { label: "0", onClick: () => inputDigit("0"), className: "col-span-2" },
    { label: ".", onClick: inputDecimal },
    { label: "=", onClick: () => applyOperator("="), className: "bg-orange-500" },
  ];

  return (
    <div className="flex h-full w-full flex-col justify-end bg-black px-3 pb-6">
      <div className="mb-4 overflow-hidden text-right">
        <span className="block truncate text-5xl font-light text-white">
          {display}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.onClick}
            className={`rounded-full bg-gray-700 py-3 text-lg font-medium text-white active:opacity-70 ${
              btn.className ?? ""
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
