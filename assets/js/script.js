import {quizList} from './quiz.js';
var startQuizBtn = document.getElementById("startBtn");
var questionCard = document.querySelector(".question-card");
var quizStartCard = document.querySelector(".quiz-start");
var qsTxt = document.querySelector(".qs");
var optionsLst = document.querySelectorAll(".options");
var commentsTxt = document.querySelector(".comment");

init();
var index = 0;


startQuizBtn.addEventListener("click", openQuiz);



function openQuiz(event)
{   hideContainer(quizStartCard);
    showContainer(questionCard);
    loadQuiz(0);
}

function loadQuiz(index){
    qsTxt.textContent = quizList[index].question;
    
}


function init() {
    index = 0;
    hideContainer(questionCard);
}

function hideContainer(element){
    element.classList.remove("flex");
    element.classList.add("hidden");
}

function showContainer(element){
    element.classList.remove("hidden");
    element.classList.add("flex");
}