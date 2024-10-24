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
const correctPassword = "111111"; //set pw//
let currentQuestionIndex = 0;
let score = 0;

//add event when click login --- if type 111111 and click, user can start the quiz. If not tye again//
loginButton.addEventListener("click", () => {
    const enteredPassword = passwordInput.value; //get input from user//
    if (enteredPassword === correctPassword) { //check password//
        isAuthenticated = true;
        alert("login successful");
        document.getElementById("login").style.display = "none"; //hide login section when login successful//
        document.getElementById("questionContainer").style.display = "block"; //display question//
        start();
    } else {
        alert("try agian");
    }
});

//function start with index 0 and 0 score//
const start = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"; // set text for the next button//
    showQuestion(); //call showQuestio function//
}


//function show question and answers from the dataset that already create//
const showQuestion = () => {
    reset(); //call reset function//
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}./${questions.length}. ${currentQuestion.question}`; //add number in front of the question -- and question counter//
    //loop using forEach//
    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.className = "choiceButton"; //create class name for css styling//
        button.textContent = choice.text; //set button text = choice//
        button.onclick = () => selectAnswer(index);
        answerButton.appendChild(button); //add button to the answer container//
        if (choice.correct) {
            button.dataset.correct = choice.correct;//mark the correct answer//
        }
        button.addEventListener("click", selectAnswer);
    });
}

//function reset card//
const reset = () => {
    nextButton.style.display = "none"; //hide next button//
    while (answerButton.firstChild) { //remove early button//
        answerButton.removeChild(answerButton.firstChild);
    }
}

//function check answer//
const selectAnswer = (e) => {
    const selectedButton = e.target; //reciveed clicked button//
    const correctChoice = selectedButton.dataset.correct === "true"; //check data//
    if (correctChoice) { //if correct answer//
        selectedButton.classList.add("correct"); //add class as correct --> stling in css//
        score++;//add score//
    } else {
        selectedButton.classList.add("wrong") //add class as wrong --> stling in css//
    }

    //disabled other answers when already clicked one of them//
    const buttons = answerButton.querySelectorAll(".choiceButton");
    buttons.forEach(button => {
        button.disabled = true;//disable all button choices//
    });

    nextButton.style.display = "block"; //show next button after choose the answer//
}

//function display next question when click at next button//
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {//check that still have question or not//
        showQuestion(); //display next question//
    } else {
        scoreResult(); //display sore//
    }
});

//function display score//
const scoreResult = () => {
    reset();
    questionElement.innerHTML = `Your score is ${score} `; //display score//
    nextButton.style.display = "none"; //hide next button//
};

document.getElementById("questionContainer").style.display = "none"; //hide questionContainer//
