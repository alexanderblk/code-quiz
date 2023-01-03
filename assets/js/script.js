const startButton = document.getElementById('start');
const questionsDiv = document.getElementById('questions');
const choicesDiv = document.getElementById('choices');
const feedbackDiv = document.getElementById('feedback');
const endScreenDiv = document.getElementById('end-screen');
const timeSpan = document.getElementById('time');
const initialsInput = document.getElementById('initials');
const submitButton = document.getElementById('submit');

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let score = 0;

function startQuiz() {
  // hide the start screen
  document.getElementById('start-screen').classList.add('hide');

  // start the timer
  timerInterval = setInterval(() => {
    timeLeft--;
    timeSpan.textContent = timeLeft;
    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);

  // show the first question
  questionsDiv.classList.remove('hide');
  showQuestion();
}

function showQuestion() {
  // get the current question
  const question = questions[currentQuestionIndex];

  // update the question title
  document.getElementById('question-title').textContent = question.title;

  // clear the previous choices
  choicesDiv.innerHTML = '';

  // show the choices for the current question
  question.choices.forEach((choice) => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.addEventListener('click', () => selectAnswer(choice));
    choicesDiv.appendChild(button);
  });
}

function selectAnswer(choice) {
  // check if the answer is correct
  const question = questions[currentQuestionIndex];
  if (choice === question.answer) {
    // show correct feedback
    feedbackDiv.textContent = 'Correct!';
    feedbackDiv.classList.remove('hide');
    score++;
  } else {
    // show incorrect feedback and subtract time
    feedbackDiv.textContent = 'Incorrect!';
    feedbackDiv.classList.remove('hide');
    timeLeft -= 10;
  }

  // move to the next question
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    // end the quiz
    endQuiz();
  } else {
    // show the next question
    showQuestion();
  }
}

function endQuiz() {
  // stop the timer
  clearInterval(timerInterval);

  // hide the questions and feedback
  questionsDiv.classList.add('hide');
  feedbackDiv.classList.add('hide');

  // show the end screen
  endScreenDiv.classList.remove('hide');

  // show the final score
  document.getElementById('final-score').textContent = score;

  // set up the submit button
  submitButton.addEventListener('click', () => {
    const initials = initialsInput.value;
    // save the score and initials
    saveHighScore(initials, score);
    // go to the high scores page
    window.location.href = 'highscores.html';
  });
}

function saveHighScore(initials, score) {
  // get the existing high scores
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  // add the new score
  highScores.push({ initials, score });
  // sort the high scores by score in descending order
  highScores.sort((a, b) => b.score - a.score);
  // save the high scores to local storage
  localStorage.setItem('highScores', JSON.stringify(highScores));
}

startButton.addEventListener('click', startQuiz);