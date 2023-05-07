var backBtn = document.querySelector(".backBtn");
var clearBtn = document.querySelector(".clearBtn");
var scoreTxt = document.querySelector(".initial-score");
init();

backBtn.addEventListener("click", function () {
    window.location.href = "index.html";
});

clearBtn.addEventListener("click", function () {
    clearHighestScoreInLocalStorage();
})

function clearHighestScoreInLocalStorage() {
    if (localStorage.getItem("userScore") != null) {
        localStorage.removeItem("userScore");
    }
}

function init(){
    var usr = JSON.parse(localStorage.getItem("userScore"));
    if (usr != null) {
        var txt = usr.initials + " - " + usr.score;
        scoreTxt.textContent = txt;
    } else{
        scoreTxt.textContent = "";
    }
}