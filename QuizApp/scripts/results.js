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

function newCookie(name, value, expire) {
    const date = new Date();
    date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/;SameSite=Lax`;
}

function deleteCookies(name) {
    newCookie(name, null, null);
}

function setResult(numErrori) {
    if(numErrori === 0) {
        resultText.style.color = green;
        resultText.textContent = "Vittoria!!"
    }
    else {
        resultText.style.color = red;
        resultText.textContent = "Sconfitta!!";
    }
}

function randomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

function setImage(numErrori) {
    if(numErrori === 0) {
        document.querySelector("#image-result").src = "./images/win.jpg";  
    }
    else {
        document.querySelector("#image-result").src = "./images/lose.png";
    }  
}

const cookieName1 = "numErrori";
const cookieName2 = "numRounds";

let numErrori = String(getCookieValueByName(cookieName1));
let cookieErrori = Number(numErrori.substring(cookieName1.length + 1));

let numRounds = String(getCookieValueByName(cookieName2));
let cookieRounds = Number(numRounds.substring(cookieName2.length + 1));

/*HTML TAGS*/
const errorText = document.querySelector("#errors-text");
const resultText = document.querySelector("#result-text");

/*USEFUL CONSTS*/
const red = "rgb(185, 18, 18)";
const green = "rgb(33, 109, 39)";

errorText.textContent = `Errate: ${cookieErrori} / ${cookieRounds}`;
setResult(cookieErrori);
setImage(cookieErrori);