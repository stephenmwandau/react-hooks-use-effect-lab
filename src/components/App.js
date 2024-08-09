import React, { useState } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  const [questions] = useState(quiz); // Ensure 'quiz' is an array and not empty
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [score, setScore] = useState(0);

  // Find the current question based on the currentQuestionId
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  function handleQuestionAnswered(correct) {
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionId < questions.length) {
      setCurrentQuestionId((prevId) => prevId + 1);
    } else {
      setCurrentQuestionId(null); // Marks the end of the quiz
    }
  }

  // If there are no questions, render a message
  if (questions.length === 0) {
    return (
      <main>
        <section>
          <h1>No questions available</h1>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question
            question={currentQuestion}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
