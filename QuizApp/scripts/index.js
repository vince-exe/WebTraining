import * as utilities from "./utilities.js";

/*HTML TAGS*/
const timeText = document.querySelector("#time");
const trueButton = document.querySelector("#true-button");
const falseButton = document.querySelector("#false-button");
const textQuiz = document.querySelector("#text-quiz");
const roundsText = document.querySelector("#rounds-text");
const resultsButton = document.querySelector("#results-button");
const navBar = document.querySelector(".main-nav");

const urlResults = "http://127.0.0.1:5500/WebDevelopment/QuizApp/results.html";
const expireDayCookies = 365;

/*GAME SETTINGS*/
const nRound = 10;
const maxTime = 10;

/*GAME VARIABLE*/
var time = maxTime;
var roundsCounter = 1;
var timeId = null;
var answerId = null;
var errorCounter = 0;

navBar.addEventListener("click", () => {
    utilities.clearRequestArray();
})

function showResultButton() {
    resultsButton.style.display = "block";
}

function updateRound() {
    if (roundsCounter === nRound) {
        return;
    }
    roundsCounter += 1;
    roundsText.textContent = `${roundsCounter} / ${nRound}`;
}

function decreaseUpdateTime() {
    if (roundsCounter === nRound) {
        window.clearInterval(timeId);
        showResultButton();
        return;
    }
    if (!time) {
        time = maxTime + 1;
        changeTextQuiz(changeRequest());
        updateRound();
        errorCounter += 1;
    }
    time -= 1;
    timeText.textContent = String(time);
}

function getKey(request) {
    let keys = utilities.quizGenerator.values();
    let i = 1;

    while (keys.next().value != request) {
        i += 1;
    }
    return i;
}

function changeTextQuiz(request) {
    textQuiz.textContent = request;
    return getKey(request);
    
}

function changeRequest() {
    while (true) {
        let request = String(utilities.quizGenerator.get(utilities.randomNumber(utilities.quizGenerator.size - 2)));
        if (utilities.checkRequest(request)) {
            utilities.pushRequest(request);
            return request;
        }
    }
}

function checkAnswer(state) {
    /* if he selected true and the answer is true if if the selected is false and the answer is false*/
    if ((state && utilities.quizChecker.get(answerId)) || (!state && !utilities.quizChecker.get(answerId))) {
    }
    /*else increment the errors counter*/
    else {
        errorCounter += 1;
    }
}

function newCookie(name, value, expire) {
    const date = new Date();
    date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/;SameSite=Lax`;
}

function initGame() {
    timeId = window.setInterval(decreaseUpdateTime, 1000);
    answerId = changeTextQuiz(changeRequest());

    trueButton.addEventListener("click", () => {
        if (roundsCounter != nRound) {
            checkAnswer(true);
            answerId = changeTextQuiz(changeRequest());
            updateRound();
            time = maxTime + 1;
        }
        else {
            showResultButton();
            return;
        }
    })

    falseButton.addEventListener("click", () => {
        if (roundsCounter != nRound) {
            checkAnswer(false);
            answerId = changeTextQuiz(changeRequest());
            updateRound();
            time = maxTime + 1;
        }
        else {
            showResultButton();
            return;
        }
    })

    resultsButton.addEventListener("click", () => {
        if (roundsCounter === nRound) {
            utilities.clearRequestArray();
            window.location.replace(urlResults);
            newCookie("numErrori", String(errorCounter), expireDayCookies);
            newCookie("numRounds", String(nRound), expireDayCookies);
            return;
        }
    })
}

initGame();