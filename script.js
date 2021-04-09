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
    display.textContent = '0';
    valList = '';
    valStack = [];
}

function numberAction(button) {
    if (answerGiven) { 
        valList = '';
        answerGiven = false;
        }
    const valToAdd = button.getAttribute("data-val");
    addToStack(valToAdd);
    acceptOperator = true;
}

function backAction() {
    answerGiven = false;
    if (valList.slice(-1) == " ") {
        valList = valList.slice(0, -3);
    } else valList = valList.slice(0, -1); 
    acceptOperator = true;
}

function operatorAction(op) {
    if (acceptOperator) {
        if(answerGiven) {
            valList = valStack[0];
        }
        answerGiven = false;
        const valToAdd = ` ${op.getAttribute("data-disp")} `;
        addToStack(valToAdd);
        acceptOperator = false;
    }
}

function equalsAction() {
    valStack = valList.split(' ');
        while (valStack.length > 1) {
            let sum = operate(valStack[1],valStack[0],valStack[2]);
            valStack[0] = `${sum}`;
            valStack.splice(1, 2);
        }
    answerGiven = true;
}

document.addEventListener('click', (e) => {
    if (numberButtons.includes(e.target)) { 
        numberAction(e.target);
    } else if (e.target.getAttribute('id') == "btn-clear") {
        clearAll();
        return;
    }  else if (e.target.getAttribute('id') == "btn-back") {
        backAction();
    } else if (operatorButtons.includes(e.target)) {
        operatorAction(e.target);
    } else if (e.target.getAttribute('id') == "btn-equal") {
        equalsAction();
    } else return;
    updateDisplay();

    //console.log(valList);
    //console.log(valStack);
});
