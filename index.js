

var questions = [
  {
    question: "Which is the correct way to declare a javaScript variable?",
    answers: [
      { text: "var carName", correct: true },
      { text: "variable carName", correct: false },
      { text: "v carName", correct: false },
      { text: "new carName>", correct: false }
    ]
  },
  {
    question: "How do you write Hello world in an alert box?",
    answers: [
      { text: "msg", correct: false },
      { text: "alert", correct: true },
      { text: "promt", correct: false },
      { text: "write", correct: false }
    ]
  },
  {
    question: "How do you creat a function in javaScript?",
    answers: [
      { text: "function myFunction{}", correct: false },
      { text: "function:myFunction()", correct: false },
      { text: "function myFunction()", correct: true },
      { text: "creat myFunction()", correct: false }
    ]
  }
];

var currentQuestionIndex = 0;
var score = 0;

var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var resultElement = document.getElementById("result");

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  nextButton.style.display = "none";
  resultElement.innerHTML = "";
  showQuestion();
}

function showQuestion() {
  resetState();
  var currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  resultElement.innerHTML = "";
}

function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct === "true";

  if (correct) {
    score++;
    resultElement.innerHTML = "Correct!";
    resultElement.style.color = "white";
  } else {
    resultElement.innerHTML = "Incorrect!";
    resultElement.style.color = "white";
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "blue";
    } else {
      button.style.backgroundColor = "gry";
    }
  });

  if (questions.length > currentQuestionIndex + 1) {
    nextButton.style.display = "block";
  } else {
    nextButton.innerText = "Show Score";
    nextButton.style.display = "block";
  }
}

function showScore() {
  resultElement.innerHTML = `Final Score: ${score} / ${questions.length}`;
  nextButton.style.display = "none";
  questionElement.innerHTML = "Quiz Completed!";
  answerButtonsElement.innerHTML = "";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (questions.length > currentQuestionIndex) {
    showQuestion();
  } else {
    showScore();
  }
});

startGame();
