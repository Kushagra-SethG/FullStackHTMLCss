const questions = [
    {
        question: "What is 7 + 5?",
        options: ["10", "11", "12", "13"],
        answer: 2, // Index of "12"
        explanation: "7 plus 5 equals 12. You can count up 5 from 7: 8, 9, 10, 11, 12."
    },
    {
        question: "If you have 10 apples and eat 3, how many apples are left?",
        options: ["5", "6", "7", "8"],
        answer: 2, // Index of "7"
        explanation: "10 minus 3 equals 7."
    },
    {
        question: "What is 4 x 3?",
        options: ["7", "10", "12", "14"],
        answer: 2, // Index of "12"
        explanation: "4 times 3 is like adding 4 three times (4 + 4 + 4 = 12)."
    },
    {
        question: "How many sides does a triangle have?",
        options: ["2", "3", "4", "5"],
        answer: 1, // Index of "3"
        explanation: "A triangle is a shape with exactly 3 sides and 3 corners."
    }
];

// State variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let wrongAnswers = [];

// DOM Elements
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score-display");
const questionTextEl = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const explanationEl = document.getElementById("explanation");
const nextBtn = document.getElementById("next-btn");

const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");
const reviewScreen = document.getElementById("review-screen");

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    
    // Update UI
    progressEl.innerText = `Q ${currentQuestionIndex + 1}/${questions.length}`;
    scoreEl.innerText = `Score: ${score}`;
    questionTextEl.innerText = q.question;
    explanationEl.classList.add("hidden");
    nextBtn.classList.add("hidden");
    
    optionsContainer.innerHTML = "";
    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => selectAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });

    timeLeft = 30;
    timerEl.innerText = `Time: ${timeLeft}s`;
    clearInterval(timerInterval);
    timerInterval = setInterval(handleTimer, 1000);
}

function handleTimer() {
    timeLeft--;
    timerEl.innerText = `Time: ${timeLeft}s`;
    
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        autoLockAndReveal();
    }
}

function selectAnswer(selectedIndex, selectedBtn) {
    clearInterval(timerInterval);
    lockOptions();
    
    const q = questions[currentQuestionIndex];
    const buttons = optionsContainer.children;
    
    // Check answer
    if (selectedIndex === q.answer) {
        selectedBtn.classList.add("correct");
        score++;
        scoreEl.innerText = `Score: ${score}`;
    } else {
        selectedBtn.classList.add("wrong");
        buttons[q.answer].classList.add("correct"); // Reveal correct
        
        wrongAnswers.push({
            question: q.question,
            yourAnswer: q.options[selectedIndex],
            correctAnswer: q.options[q.answer],
            explanation: q.explanation
        });
    }
    
    showExplanationAndNext(q.explanation);
}

function autoLockAndReveal() {
    lockOptions();
    const q = questions[currentQuestionIndex];
    const buttons = optionsContainer.children;
    
    buttons[q.answer].classList.add("correct");
    
    wrongAnswers.push({
        question: q.question,
        yourAnswer: "Time Ran Out",
        correctAnswer: q.options[q.answer],
        explanation: q.explanation
    });

    showExplanationAndNext(q.explanation);
}

function lockOptions() {
    const buttons = optionsContainer.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("disabled");
    }
}

function showExplanationAndNext(text) {
    explanationEl.innerText = `Explanation: ${text}`;
    explanationEl.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    quizScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    
    document.getElementById("final-score").innerText = `${score} / ${questions.length}`;
    
    let rating = "Keep practicing! You'll get it.";
    if (score === questions.length) rating = "Excellent! Perfect Score!";
    else if (score >= questions.length / 2) rating = "Good Job!";
    
    document.getElementById("rating-message").innerText = rating;
}

function showReview() {
    endScreen.classList.add("hidden");
    reviewScreen.classList.remove("hidden");
    
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";
    
    if (wrongAnswers.length === 0) {
        reviewList.innerHTML = "<p>No wrong answers! Great job!</p>";
        return;
    }

    wrongAnswers.forEach(item => {
        reviewList.innerHTML += `
            <div class="review-item">
                <p><strong>Q:</strong> ${item.question}</p>
                <p style="color: red;"><strong>Your Answer:</strong> ${item.yourAnswer}</p>
                <p style="color: green;"><strong>Correct Answer:</strong> ${item.correctAnswer}</p>
                <p><em>${item.explanation}</em></p>
            </div>
        `;
    });
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    wrongAnswers = [];
    
    reviewScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    
    loadQuestion();
}

loadQuestion();