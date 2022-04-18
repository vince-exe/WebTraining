function getCookieValueByName(name) {
    let cDecoded = decodeURIComponent(document.cookie);
    let cArray = cDecoded.split("; ");
    let result = null;

    cArray.forEach(element => {
        if (element.indexOf(name) == 0) {
            result = element;
        }
    })
    return result;
}

function randomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

function generateMove() {
    let move = randomNumber(2);
    postImage(robotImage, move);

    return moves.get(move);
}

function checkMove(value, move, value2) {
    postImage(userImage, value2);
    
    switch(value) {
        case "sasso":
            if(move === "forbice") {
                /*i won*/
                postImage(winnerImage, 0);
                return 1;
            }
            else if(move === "carta") {
                /*i lost*/
                postImage(winnerImage, 2);
                return 0;
            }
            else {
                postImage(winnerImage, 0);
                return -1;
            }
            
        case "forbice":
            if(move === "carta") {
                postImage(winnerImage, 1);
                return 1;
            }
            else if(move === "sasso") {
                postImage(winnerImage, 0);
                return 0;
            }
            else {
                postImage(winnerImage, 1);
                return -1;
            }

        case "carta":
            if(move === "sasso") {
                postImage(winnerImage, 2);
                return 1;
            }
            else if(move === "forbice") {
                postImage(winnerImage, 1);
                return 0;
            }
            else {
                postImage(winnerImage, 2);
                return -1;
            }
        
        default:
            return -1;
    }
}

function updateScore(generalScore, value) {
    let n = Number(generalScore.textContent);

    n += value;
    generalScore.textContent = String(n);
}

function postImage(image, value) {
    image.src = images.get(value);
}

function checkWin() {
    if(scoreRobot != score && scoreUser != score) {
        return 1;
    }
    else if(scoreRobot === score) {
        return 0;
    }
    else {
        return 2;
    }
}

function showWinner(robot) {
    winnerBox.style.display = "block";

    if(robot) {
        winnerText.textContent = "Vince il robot :(";
    }
    else {
        winnerText.textContent = `Il vincitore è ${username}`;
    }
}

function deleteCookies(name) {
    newCookie(name, null, null);
}

function newCookie(name, value, expire) {
    const date = new Date();
    date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/;SameSite=Lax`;
}

const itemForbice = document.querySelector("#forbice");
const itemSasso = document.querySelector("#sasso");
const itemCarta = document.querySelector("#mano");
const userScore = document.querySelector("#user-score");
const robotScore = document.querySelector("#robot-score");
const winnerImage = document.querySelector(".image-section");
const userImage = document.querySelector(".image-user");
const robotImage = document.querySelector(".image-robot");
const winnerBox = document.querySelector(".winner-container");
const winnerText = document.querySelector("#winnerText");

var scoreRobot = 0;
var scoreUser = 0;

const moves = new Map ([
    [0, "sasso"],
    [1, "forbice"],
    [2, "carta"],    
])

const images = new Map ([
    [0, "./images/sasso.png"],
    [1, "./images/forbice.png"],
    [2, "./images/mano.png"],
])

var username = String(getCookieValueByName("username"));
username = username.substring(9, username.length);

var score = String(getCookieValueByName("maxScore"));
score = score.substring(9, score.length);
score = Number(score);

document.querySelector("#info-text").textContent = `${username} VS Robot`;

itemForbice.addEventListener("click", () => {
    let checkWinner = checkWin();

    if(checkWinner === 1) {
        let check = checkMove("forbice", generateMove(), 1);

        if (check === 1) {
            updateScore(userScore, 1);
            scoreUser += 1;
        }
        else if(check === 0) {
            scoreRobot += 1;
            updateScore(robotScore, 1);
        } 
    }
    else if(!checkWinner) {
        showWinner(1);
    }  
    else {
        showWinner(0);
    }
})

itemSasso.addEventListener("click", () => {
    let checkWinner = checkWin();

    if(checkWinner === 1) {
        let check = checkMove("sasso", generateMove(), 0);

        if (check === 1) {
            scoreUser += 1;
            updateScore(userScore, 1);
        }
        else if (check === 0) {
            scoreRobot += 1;
            updateScore(robotScore, 1);
        } 
    }
    else if(!checkWinner) {
        showWinner(1);
    }
    else {
        showWinner(0);
    }
})

itemCarta.addEventListener("click", () => {
    let checkWinner = checkWin();

    if(checkWinner === 1) {
        let check = checkMove("carta", generateMove(), 2);

        if (check === 1) {
            scoreUser += 1;
            updateScore(userScore, 1);
        }
        else if (check === 0) {
            scoreRobot += 1;
            updateScore(robotScore, 1);
        }
    }
    else if(!checkWinner) {
        showWinner(1);
    }
    else {
        showWinner(0);
    }
})

winnerBox.addEventListener("click", () => {
    console.log("ok");
    deleteCookies("maxScore");
    deleteCookies("username");
    window.location.replace("./index.html");
})

document.querySelector(".main-nav").addEventListener("click", () => {
    deleteCookies("username");
    deleteCookies("maxScore");
})