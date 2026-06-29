let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

let quizQuestions = [...questions];

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(quizQuestions);

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const progressBar = document.getElementById("progressBar");

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerEl.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {

    if (currentQuestion >= quizQuestions.length) {
        localStorage.setItem("score", score);
        window.location.href = "result.html";
        return;
    }

    startTimer();

    let q = quizQuestions[currentQuestion];

    questionEl.textContent = q.question;

    let options = [...q.options];
    shuffleArray(options);

    answersEl.innerHTML = "";

    options.forEach(option => {

        let btn = document.createElement("button");

        btn.className = "answer";

        btn.textContent = option;

        btn.onclick = function () {

            clearInterval(timer);

            document.querySelectorAll(".answer").forEach(b => {
                b.disabled = true;

                if (b.textContent === q.correctAnswer) {
                    b.style.background = "#16a34a";
                    b.style.color = "#fff";
                }
            });

            if (option === q.correctAnswer) {
                score += 5;
            } else {
                btn.style.background = "#dc2626";
                btn.style.color = "#fff";
            }

            scoreEl.textContent = "Score : " + score + " / 100";

        };

        answersEl.appendChild(btn);

    });

    progressBar.style.width =
        ((currentQuestion + 1) / quizQuestions.length) * 100 + "%";
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);

window.onload = function () {

    if (typeof questions === "undefined") {
        questionEl.textContent = "questions.js not loaded";
        return;
    }

    if (questions.length === 0) {
        questionEl.textContent = "No Questions Found";
        return;
    }

    loadQuestion();
};
