const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const section1 = document.querySelector(".section1");

let active = false;
const marginLeft = 5;

function moveNavLinks(left, marginLeft) {
    navLinks.style.left = left;
    navLinks.style.marginLeft = marginLeft;
}

hamburger.addEventListener("click", () => {

    if(!active) {
        moveNavLinks(0, 0);
        section1.style.marginTop = 330 + "px";
        active = true;
    }

    else {
        moveNavLinks(100 + "%", marginLeft + "%");
        section1.style.marginTop = 100 + "px";
        active = false;
    }
})

const archive = new Map ([
    ["O'Miricano", 5],
    ["Turco", 6],
    ["O'nzivat", 10],
    ["O'zuzzus", 12],
    ["O'scem", 10],
    ["Napulè", 13],
]);

const buttonConvert = document.getElementById("button-convert");
const moneyText = document.getElementById("money-text");
const kebabNameText = document.getElementById("kebab-name");
const result = document.getElementById("result");

function checkDatas(moneyText, kebabName) {
    if(moneyText == "") {
        alert("Devi inserire il numero di soldi");
        return false;
    }
    else if(kebabName == "") {
        alert("Devi inserire il tipo di kebab");
        return false;
    }

    else if(!archive.has(kebabName)) {
        alert(`Non esiste alcun kebab con il nome: ${kebabName}`);
        return false;
    }
    return true;
}

function changeResult(value) {
    result.textContent = `Numero kebab acquistabili: ${value}`;
};

function cleanHtmlElements() {
    moneyText.value = "";
    kebabNameText.value = "";
}

buttonConvert.addEventListener("click", () => {
    let money = moneyText.value;
    let kebabname = kebabNameText.value;

    if(checkDatas(money, kebabname)) {
        money = Number(money);
        let kebabPrice = archive.get(kebabname);

        changeResult((money / kebabPrice).toFixed(0));
        cleanHtmlElements();
    }
})