import { quizList } from './quiz.js';
var score = 0;
var timeLimit = 30;
var startQuizBtn = document.querySelector(".startBtn");
var questionCard = document.querySelector(".question-card");
var initialsForm = document.querySelector(".form-section");
var quizStartCard = document.querySelector(".quiz-start");
var qsTxt = document.querySelector(".qs");
var scoreTxt = document.querySelector(".score");
var ansTxt = document.querySelector(".ans");
var optionsLst = document.querySelector(".qs-options");
var commentsTxt = document.querySelector(".comment");
var timerTxt = document.querySelector(".timer-status");
var index = 0;
var timer;

startQuizBtn.addEventListener("click", openQuiz);
optionsLst.addEventListener("click", checkAnswer);
initialsForm.addEventListener("click", getScore);

init();

function openQuiz() {
    timer = setInterval(function () {
        timerTxt.textContent = --timeLimit;
        if (timeLimit <= 0) {
            clearInterval(timer);
            timerTxt.textContent = 0;
            cleanUp();
            displayScore();
            return;
        }
    }, 1000);
    loadQuiz(index);
}

function loadQuiz(num) {
    cleanUp();
    if (index > quizList.length - 1) {
        clearInterval(timer);
         displayScore();
        return;
    }
    qsTxt.textContent = quizList[num].question;
    ansTxt.textContent = quizList[num].answer;
    var i = 0;
    for (var option of quizList[num].options) {
        var li = document.createElement("li");
        var check = document.createElement("input");

        check.id = "list-item-" + i++;
        check.type = "checkbox";
        var label = document.createElement("label");
        label.htmlFor = check.id;

        check.classList.add("options-style");
        li.appendChild(check);
        li.appendChild(label);
        li.appendChild(document.createTextNode(option));
        optionsLst.appendChild(li);
    }
    showElement(questionCard);
    ++index;
}

function cleanUp() {
    hideElement(questionCard);
    deleteElements();
    hideElement(quizStartCard);
    commentsTxt.textContent = "";
    scoreTxt.textContent = "";
}
function init() {
    index = 0;
    timeLimit = 30;
    timerTxt.textContent = timeLimit;
}

function hideElement(element) {
    element.classList.remove("flex");
    element.classList.add("hidden");
}

function showElement(element) {
    element.classList.remove("hidden");
    element.classList.add("flex");
}

function checkAnswer(event) {
    var actualAnswer = event.target.textContent.trim();
    var expectedAnswer = ansTxt.textContent.trim();

    if (actualAnswer === expectedAnswer) {
        commentsTxt.textContent = "Correct Answer!!!";
        ++score;
    } else {
        commentsTxt.textContent = "Wrong Answer!!!";
        timeLimit -= 10;
    }
    setTimeout(function () {
        loadQuiz(index);
    }, 500);
}

function deleteElements() {
    const list = optionsLst.getElementsByTagName("li");

    while (list.length > 0) {
        list[0].remove();
    }
}
function displayScore() {
    showElement(questionCard);
    qsTxt.textContent = "All done!"
    scoreTxt.textContent = "Your final score is " + score;
    displayInitialsForm();
}

function displayInitialsForm() {
    initialsForm.appendChild(createForm());
}

function getScore(event) {
    if (event.target.id === 'submitInitial'){
        event.preventDefault();
        window.location.href = "highscore.html";
    }
}

function createForm() {
    var form = document.createElement('form');
    var label = document.createElement('label');
    label.for = 'initials';
    label.innerHTML = 'Enter Initials:';
    var input = document.createElement('input');
    input.type = 'text';
    input.id = 'initials';
    input.placeholder = 'Initials';
    var btn = document.createElement('button');
    btn.type = 'submit';
    btn.id = 'submitInitial';
    btn.innerHTML = 'Submit';
    btn.classList.add("startBtn");
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(btn);
    return form;
}
