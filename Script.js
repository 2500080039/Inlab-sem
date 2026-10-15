
const questions = [
    {
        question: "1. Which language is used to structure a web page?",
        options: ["CSS", "HTML", "Java", "Python"],
        answer: 1
    },
    {
        question: "2. Which language is used to style web pages?",
        options: ["HTML", "C", "CSS", "SQL"],
        answer: 2
    },
    {
        question: "3. Which language makes a web page interactive?",
        options: ["JavaScript", "HTML", "CSS", "XML"],
        answer: 0
    },
    {
        question: "4. Which keyword declares a constant in JavaScript?",
        options: ["var", "let", "const", "static"],
        answer: 2
    },
    {
        question: "5. Which method selects an element by its ID?",
        options: [
            "getElementById()",
            "getClass()",
            "queryAll()",
            "selectId()"
        ],
        answer: 0
    }
];

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let score = 0;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const questionCount = document.getElementById("question-count");
const highScoreElement = document.getElementById("high-score");
const progressBar = document.getElementById("progress-bar");

const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");

const quizArea = document.getElementById("quiz-area");
const resultArea = document.getElementById("result-area");

// Read the saved highest score
function getHighScore() {
    return Number(localStorage.getItem("quizHighScore")) || 0;
}

// Display the highest score
function displayHighScore() {
    highScoreElement.textContent = getHighScore();
}

function displayQuestion() {
    const q = questions[currentQuestion];

    questionElement.textContent = q.question;
    questionCount.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    optionsContainer.innerHTML = "";

    // Create options dynamically
    q.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "option";
        button.textContent = option;

        if (userAnswers[currentQuestion] === index) {
            button.classList.add("selected");
        }

        button.addEventListener("click", () => {
            userAnswers[currentQuestion] = index;
            displayQuestion();
        });

        optionsContainer.appendChild(button);
    });

    // Update progress bar
    progressBar.style.width =
        ((currentQuestion + 1) / questions.length) * 100 + "%";

    // Update navigation buttons
    previousBtn.disabled = currentQuestion === 0;

    nextBtn.hidden = currentQuestion === questions.length - 1;
    submitBtn.hidden = currentQuestion !== questions.length - 1;
}

// Go to the previous question
previousBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
});

// Go to the next question
nextBtn.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
});

// Submit the quiz and calculate the score
submitBtn.addEventListener("click", () => {
    const unanswered = userAnswers.some(answer => answer === null);

    if (unanswered) {
        alert("Please answer all questions before submitting!");
        return;
    }

    score = 0;

    questions.forEach((q, index) => {
        if (userAnswers[index] === q.answer) {
            score++;
        }
    });

    // Update highest score only if the new score is greater
    let highScore = getHighScore();

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("quizHighScore", highScore);
    }

    // Display results
    quizArea.hidden = true;
    resultArea.hidden = false;

    document.getElementById("result-message").textContent =
        score === questions.length
            ? "Excellent! You got every answer correct!"
            : "Good effort! Keep practicing.";

    document.getElementById("final-score").textContent =
        `Your Score: ${score} / ${questions.length}`;

    document.getElementById("result-high-score").textContent =
        `Highest Score: ${highScore} / ${questions.length}`;

    displayHighScore();
});

// Restart the quiz
restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    score = 0;

    resultArea.hidden = true;
    quizArea.hidden = false;

    displayHighScore();
    displayQuestion();
});

// Initialize the application
displayHighScore();
displayQuestion();
