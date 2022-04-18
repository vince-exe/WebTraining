const usernameField = document.querySelector("#username-field");
const playButton = document.querySelector("#play-button");
const optionsButton = document.querySelector("#option-button");

const minChar = 4;
const playUrl = "./play.html";
const optionUrl = "./options.html"
const defaultScore = 3;

function newCookie(name, value, expire) {
    const date = new Date();
    date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/;SameSite=Lax`;
}

function checkText() {
    let check = String(usernameField.value);

    return check.length >= minChar;
}

window.addEventListener("keypress", e => {
    if(e.key === "Enter") {
        if(checkText()) {
            newCookie("username", String(usernameField.value), 365);
            window.location.replace(playUrl);
        }
        else {
            alert(`L'username deve avere minimo ${minChar} caratteri`);
        }
    }
})

playButton.addEventListener("click", () => {
    if(checkText()) {
        newCookie("username", String(usernameField.value), 365);
        window.location.replace(playUrl);
    }
    else {
        alert(`L'username deve avere minimo ${minChar} caratteri`);
    }
})

optionsButton.addEventListener("click", () => {
    if (checkText()) {
        newCookie("username", String(usernameField.value), 365);
        window.location.replace(optionUrl);
    }
    else {
        alert(`L'username deve avere minimo ${minChar} caratteri`);
    }
})

newCookie("maxScore", String(defaultScore), 365);