const changeScore = document.querySelector("#change-score-field");
const saveButton = document.querySelector("#save-button");

const url = "./play.html";

function newCookie(name, value, expire) {
    const date = new Date();
    date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/;SameSite=Lax`;
}

function checkValue() {
    if(changeScore.value === "") {
        return 0;
    }

    let check = Number(changeScore.value);
    if(check >= 1 && check <= 9) {
        return 1;
    }

    return 0;
}

function deleteCookies(name) {
    newCookie(name, null, null);
}

saveButton.addEventListener("click", () => {
    if(checkValue()) {
        deleteCookies("maxScore");
        newCookie("maxScore", String(changeScore.value), 365);
        window.location.replace(url);
    }
    else {
        window.location.replace(url);
    }
})