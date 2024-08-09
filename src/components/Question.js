import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect to handle the countdown timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the timer when the component unmounts or when timeRemaining changes
    return () => clearTimeout(timer);
  }, [timeRemaining]);

  // useEffect to handle when the timer reaches zero
  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10); // Reset timeRemaining for the next question
      onAnswered(false); // Notify the parent component that time is up
    }
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={index} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
