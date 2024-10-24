//import data//
/*import questions from './data.js';*/
//create set of data (questions, choices and answer) in array//
const questions = [
    {
        question: "What is the name of the main character, the concierge of the Grand Budapest Hotel?",
        choices: [
            { text: "Gustave H", correct: true },
            { text: "Zero Moustafa", correct: false },
            { text: "Dmitri", correct: false },
            { text: "Jopling", correct: false },
        ]
    },
    {
        question: "Who plays the role of Gustave H. in the film?",
        choices: [
            { text: "Bill Murray", correct: false },
            { text: "Adrien Brody", correct: true },
            { text: "Ralph Fiennes", correct: false },
            { text: "Willem Dafoe", correct: false },
        ]
    },
    {
        question: "What item is central to the plot and is sought after throughout the movie?",
        choices: [
            { text: "A stolen necklace", correct: true },
            { text: "A priceless painting", correct: false },
            { text: "A will", correct: false },
            { text: "A hotel key", correct: false },
        ]
    },
    {
        question: "Which fictional country is the Grand Budapest Hotel located in?",
        choices: [
            { text: "Eldoria", correct: false },
            { text: "Frolinia", correct: false },
            { text: "Valoria", correct: true },
            { text: "Zubrowka", correct: false },
        ]
    },
    {
        question: "What type of establishment is the Grand Budapest Hotel?",
        choices: [
            { text: "A restaurant", correct: false },
            { text: "A museum", correct: true },
            { text: "A hotel", correct: false },
            { text: "A casino", correct: false },
        ]
    },
]

//get the element by id from html//
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("choices");
const nextButton = document.getElementById("nextButton");
const loginButton = document.getElementById("loginButton");
const passwordInput = document.getElementById("typeBox");
const correctPassword = "111111";

//use let because it will change//
let currentQuestionIndex = 0;
let score = 0;

loginButton.addEventListener ("click",() => {
    const enteredPassword = passwordInput.value;
    if (enteredPassword === correctPassword) {
        isAuthenticated = true;
        alert("login successful");
        document.getElementById("login").style.display = "none";
        document.getElementById("questionContainer").style.display = "block";
        startQuiz();
    } else {
        alert("try agian");
    }
});

//function start with index 0 and 0 score//
const start = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

const showQuestion = () => {
    reset();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.className = "choiceButton";
        button.textContent = choice.text;
        button.onclick = () => selectAnswer(index);
        answerButton.appendChild(button);
        if (choice.correct) {
            button.dataset.correct = choice.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

const reset = () => {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

const selectAnswer = (e) => {
    const selectedButton = e.target;
    const correctChoice = selectedButton.dataset.correct === "true";
    if (correctChoice) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong")
    }

    //disabled other answers when already clicked one of them//
    const buttons = answerButton.querySelectorAll(".choiceButton");
    buttons.forEach(button => {
        button.disabled = true; 
    });

    nextButton.style.display = "block"; //show next button after choose the answer//
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        scoreResult();
    }
});

const scoreResult = () => {
    reset();
    questionElement.innerHTML = `Your score is ${score} `;
    nextButton.style.display = "none";
};

document.getElementById("questionContainer").style.display = "none";