//import data//
import questions from './data.js';

//get the element by id from html//
const questionElement = document.getElementById("questions");
const answerButton = document.getElementById("choices");
const nextButton = document.getElementById("nextButton");

//use let because it will change//
let currentQuestionIndex = 0;
let score = 0;

//function start with index 0 and 0 score//
function start(){
    currentQuestionIndex = 0;
    score = 0;
}