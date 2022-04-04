const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const section1 = document.querySelector(".section1");

let active = false;
let modify = true;
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
    ["o miricano", 5],
    ["turco", 6],
    ["o nzivat", 10],
    ["o zuzzus", 12],
    ["o scem", 10],
    ["napulè", 13],
]);

const buttonConvert = document.getElementById("button-convert");
const moneyText = document.getElementById("money-text");
const kebabNameText = document.getElementById("kebab-name");
const result = document.getElementById("result");

function checkDatas(moneyText, kebabName, modify) {
    if(moneyText == "") {
        alert("Devi inserire il numero di soldi");
        return false;
    }
    else if(kebabName == "") {
        alert("Devi inserire il tipo di kebab");
        return false;
    }

    else if(!archive.has(kebabName)) {
        if(archive.has(kebabName.toLowerCase())) {
            modify = true;
            return true;
        }
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

    if(checkDatas(money, kebabname, modify)) {
        if(modify) {
            kebabname = kebabname.toLowerCase();
            console.log(kebabname);
        }
        money = Number(money);
        let kebabPrice = archive.get(kebabname);

        changeResult((money / kebabPrice).toFixed(0));
        cleanHtmlElements();
    }
})