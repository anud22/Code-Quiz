import { quizList } from './quiz.js';
var score = 0;
var startQuizBtn = document.getElementById("startBtn");
var questionCard = document.querySelector(".question-card");
var quizStartCard = document.querySelector(".quiz-start");
var qsTxt = document.querySelector(".qs");
var scoreTxt = document.querySelector(".score");
var ansTxt = document.querySelector(".ans");
var optionsLst = document.querySelector(".qs-options");
var commentsTxt = document.querySelector(".comment");

var index = 0;

startQuizBtn.addEventListener("click", openQuiz);
optionsLst.addEventListener("click", checkAnswer);


function openQuiz() {
    index = 0;
    loadQuiz(index);
}

function loadQuiz(num) {
    init();
    if (index > quizList.length - 1) {
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

function init() {
    hideElement(questionCard);
    deleteElements();
    hideElement(quizStartCard);
    commentsTxt.textContent = "";
    scoreTxt.textContent = "";
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
}
