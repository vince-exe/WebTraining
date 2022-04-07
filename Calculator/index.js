const allButtons = document.querySelectorAll(".btn");
const screen = document.querySelector("#screen");

const maxLenght = 8;
var counter = 0;
var operation = false;
var operationType = null;
var number1;
var number2;

function cleanScreen(screen) {
    counter = 0;
    screen.value = "";
}

function getNumber(number) {
    number2 = String(number2);
    number2 = number2.slice(0, number2.length - 1);

    return number;
}

function showContent(screen, content) {
    if((counter += 1) <= maxLenght)
        if(operation) {
            screen.value = content;
            operation = false;
        }
        else {
            screen.value += content;
        }
}

function sqrt(screen) {
    if(screen.value != "") {
        let number = parseInt(screen.value);
        showContent(screen, String(Math.sqrt(number).toFixed(2)))
    }
}

function pow(screen, cube) {
    if(screen.value != "") {
        if(!cube) {
            let number = parseInt(screen.value);
            showContent(screen, String(Math.pow(number, 2)));
        }
        else {
            let number = parseInt(screen.value);
            showContent(screen, String(Math.pow(number, 3)));
        }
    }
}

function percent(number1, percentuage) {
    return ((number1 * percentuage) / 100).toFixed(2);
}

function result(screen, number1, number2) {
    cleanScreen(screen);

    console.log(number1);
    console.log(number2);

    switch(operationType) {
        case "sum":
            operation = true;
            showContent(screen, String(number1 + number2));
            operationType = null;
            break;
        
        case "sub":
            operation = true;
            showContent(screen, String(number1 - number2));
            operationType = null;
            break;

        case "molt":
            operation = true;
            showContent(screen, String(number1 * number2));
            operationType = null;
            break;

        case "half":
            operation = true;
            showContent(screen, String(number1 / number2));
            operationType = null;
            break;
    
        default:
            break;
    }
}

allButtons.forEach(element => {
    element.addEventListener("click", () => {
        showContent(screen, element.textContent);

        switch(element.textContent) {
            case "CE":
                cleanScreen(screen);
                break;

            case "x²":
                operation = true;
                pow(screen, false);
                break;

            case "√":
                operation = true;
                sqrt(screen);
                break;

            case "x³":
                operation = true;
                pow(screen, true);
                break;

            case "÷":
                if(screen.value != "") {
                    number1 = screen.value;
                    operationType = "half";
                    cleanScreen(screen);
                }
                break;
            
            case "*":
                if(screen.value != "") {
                    number1 = screen.value;
                    operationType = "molt";
                    cleanScreen(screen);
                }
                break;

            case "-":
                if(screen.value != "") {
                    number1 = screen.value;
                    operationType = "sub";
                    cleanScreen(screen);
                }
                break;

            case "%":
                if(screen.value != "") {
                    number1 = screen.value;
                    operationType = "percent";
                    cleanScreen(screen);
                }
                break;

            case "+":
                if(screen.value != "") {
                    number1 = screen.value;
                    operationType = "sum";
                    cleanScreen(screen);
                }
                break;

            case "=":
                if(screen.value != "") {
                    if(operationType == "percent") {
                        operation = true;
                        number2 = screen.value;
                        showContent(screen, String(percent(parseInt(getNumber(number2)), parseInt(getNumber(number1)))));
                    }
                    else {
                        number2 = screen.value;               
                        result(screen, parseInt(getNumber(number1)), parseInt(getNumber(number2)));
                    }
                }
                break;
        }
    })
})