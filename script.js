function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator == '+') return add(a, b);
    if (operator == '-') return subtract(a, b);
    if (operator == 'x') return multiply(a, b);
    if (operator == '/') return divide(a, b);
}

let firstNumber = 0;
let secondNumber = '';
let displayOperator;
let actionOperator;
let stage = 0;
let answer;

const numberButtons = Array.from(document.querySelectorAll(".num"));
const operatorButtons = Array.from(document.querySelectorAll(".op"));
const display = document.querySelector("#display-content")

function addToNumber(num, stage) {
    if (stage == 0) {
        firstNumber = (firstNumber * 10) + +num;}
    if (stage == 1) {
        secondNumber = (secondNumber * 10) + +num;}
}

function updateDisplay() {
    if (stage == 0) display.textContent = firstNumber;
    if (stage == 1) display.textContent = `${firstNumber} ${displayOperator} ${secondNumber}`;
    if (stage == 2) display.textContent = answer;
}

function clearAll() {
    firstNumber = 0;
    secondNumber = '';
    displayOperator = '';
    actionOperator = '';
    stage = 0;
}

document.addEventListener('click', (e) => {
    if (numberButtons.includes(e.target)) { 
        if (stage == 2) { 
            clearAll() 
            stage = 0;
        }
        const valToAdd = e.target.getAttribute('data-val')
        addToNumber(valToAdd, stage);
    } else if (e.target.getAttribute('id') == "btn-clear") {
        clearAll()
    } else if (operatorButtons.includes(e.target)) {
        actionOperator = e.target.getAttribute('data-disp');
        displayOperator = e.target.getAttribute('data-disp');
        stage = 1;
    } else if (e.target.getAttribute('id') == "btn-equal") {
        stage = 2;
        answer = operate(actionOperator, firstNumber, secondNumber );
    }
    updateDisplay()
});

