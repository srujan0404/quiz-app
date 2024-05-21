const initializeButton = document.querySelector(".initialize-btn");
const quizBox = document.querySelector(".quiz-box");
const questionBox = document.getElementById("question-box");
const queryElement = document.getElementById("query");
const choicesElement = document.getElementById("choices");
const quizTitle = document.querySelector(".quiz-title");
const progress = document.getElementById("progress");

const newQuestions = [
  {
    question: 'Which element has the chemical symbol "O"?',
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Gold", correct: false },
      { text: "Silver", correct: false },
      { text: "Osmium", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Claude Monet", correct: false },
    ],
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Seoul", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Beijing", correct: false },
      { text: "Bangkok", correct: false },
    ],
  },
  {
    question: "What is the Capital of karnataka?",
    answers: [
      { text: "hyderabad", correct: false },
      { text: "Mysore", correct: false },
      { text: "Bengaluru", correct: true },
      { text: "kolkata", correct: false },
    ],
  },
  {
    question: "Who developed the theory of relativity?",
    answers: [
      { text: "Isaac Newton", correct: false },
      { text: "Galileo Galilei", correct: false },
      { text: "Albert Einstein", correct: true },
      { text: "Nikola Tesla", correct: false },
    ],
  },
];

let questionList, currentIndex, score;

initializeButton.addEventListener("click", startQuiz);

function startQuiz() {
  initializeButton.classList.add("hidden");
  quizTitle.classList.add("hidden");
  questionList = shuffleArray([...newQuestions]);
  currentIndex = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  progress.classList.remove("hidden");
  showNextQuestion();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showNextQuestion() {
  resetState();
  displayQuestion(questionList[currentIndex]);
}

function displayQuestion(question) {
  queryElement.textContent = `Question ${currentIndex + 1}: ${
    question.question
  }`;
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.classList.add("choice-btn");
    button.textContent = `${index + 1}. ${answer.text}`;
    button.dataset.correct = answer.correct;
    button.addEventListener("click", handleAnswerClick);
    choicesElement.appendChild(button);
  });
  updateProgressBar();
}

function resetState() {
  queryElement.classList.remove("result-message");
  choicesElement.innerHTML = "";
  progress.style.width = "0%";
}

function handleAnswerClick(event) {
  const selectedButton = event.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) score++;
  currentIndex++;
  if (currentIndex < questionList.length) {
    showNextQuestion();
  } else {
    displayScore();
  }
}

function updateProgressBar() {
  const progressPercentage = ((currentIndex + 1) / newQuestions.length) * 100;
  progress.style.width = `${progressPercentage}%`;
}

function displayScore() {
  resetState();
  queryElement.textContent = `Quiz Complete! Your score is ${score} out of ${newQuestions.length}.`;
  initializeButton.textContent = "Retry Quiz";
  initializeButton.classList.remove("hidden");
  queryElement.classList.add("result-message");
  progress.classList.add("hidden");
}
