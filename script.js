function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    return +a / +b;
}

function operate(operator, a, b) {
    if (operator == '+') return add(a, b);
    if (operator == '-') return subtract(a, b);
    if (operator == 'x') return multiply(a, b);
    if (operator == '/') return divide(a, b);
}

let valList = '';
let valStack = []
let acceptOperator = false;
let answerGiven = false;

const numberButtons = Array.from(document.querySelectorAll(".num"));
const operatorButtons = Array.from(document.querySelectorAll(".op"));
const display = document.querySelector("#display-content")

function addToStack(val) {
    valList += val;
}

function updateDisplay() {
    if (answerGiven) {
    display.textContent = valStack[0];
    }
    else display.textContent = valList;
}

function clearAll() {
    valList = '';
    valStack = [];
}

document.addEventListener('click', (e) => {
    if (numberButtons.includes(e.target)) { 
        if (answerGiven) { 
            valList = '';
            answerGiven = false;
            }
        const valToAdd = e.target.getAttribute("data-val");
        addToStack(valToAdd);
        acceptOperator = true;
    } else if (e.target.getAttribute('id') == "btn-clear") {
        clearAll()
    } else if (operatorButtons.includes(e.target)) {
        if (acceptOperator) {
            if(answerGiven) {
                valList = valStack[0];
            }
            answerGiven = false;
            const valToAdd = ` ${e.target.getAttribute("data-disp")} `;
            addToStack(valToAdd);
            acceptOperator = false;
        }
    } else if (e.target.getAttribute('id') == "btn-equal") {
        
        valStack = valList.split(' ');
        while (valStack.length > 1) {
            let sum = operate(valStack[1],valStack[0],valStack[2]);
            valStack[0] = `${sum}`;
            valStack.splice(1, 2);
        }
        answerGiven = true;
    } else return;
    console.log(valList);
    console.log(valStack);
    updateDisplay();
});
