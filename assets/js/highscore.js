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
    var savedUserScores = localStorage.getItem("userScores");
    if (savedUserScores == null) {
        return;
    }
    savedUserScores = JSON.parse(savedUserScores);
    var currentInitials = localStorage.getItem("currentInitials");
    var position = -1;
    if (savedUserScores != null) {
        for (var index = 0; index < savedUserScores.length; ++index) {
            if (savedUserScores[index].initials === currentInitials) {
                position = index;
                break;
            }
        }
        savedUserScores.splice(position, 1);
        if (savedUserScores.length === 0) {
            localStorage.removeItem("userScores");
        } else {
            localStorage.setItem("userScores", JSON.stringify(savedUserScores));
        }
    }
}

function init() {
    var savedUserScores = localStorage.getItem("userScores");
    if (savedUserScores == null) {
        scoreTxt.textContent = "";
        return;
    }
    savedUserScores = JSON.parse(savedUserScores);
    var currentInitials = localStorage.getItem("currentInitials");
    for (var index = 0; index < savedUserScores.length; ++index) {
        if (savedUserScores[index].initials === currentInitials) {
            var txt = savedUserScores[index].initials + " - " + savedUserScores[index].score;
            scoreTxt.textContent = txt;
            return;
        }
    }
}
