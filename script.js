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
let allowEquals = false;
let answerGiven = false;

const numberButtons = Array.from(document.querySelectorAll(".num"));
const operatorButtons = Array.from(document.querySelectorAll(".op"));
const display = document.querySelector("#display-content")

const itemRegex = new RegExp(/\d+\.?\d*|[+\-/x]/g);

function addToLists(val) {
    valList += val;
}

function updateDisplay() {
    if (answerGiven) {
        display.textContent =  valStack[0];
    }
    else {display.textContent = valList;}
    if (valList == "") {
        display.textContent = '0';
    } 
    console.log("display updated")
}

function clearAll() {
    valList = '';
    valStack = [];
}

function numberAction(button) {
    allowEquals = true;
    if (answerGiven) { 
        valList = '';
        answerGiven = false;
        }
    const valToAdd = button.getAttribute("data-val");
    addToLists(valToAdd);
    acceptOperator = true;
}

function backAction() {
    answerGiven = false;
    valList = valList.slice(0, -1); 
}

function operatorAction(op) {
    if (acceptOperator) {
        if(answerGiven) {
            valList = valStack[0];
        }
        answerGiven = false;
        const valToAdd = `${op.getAttribute("data-disp")}`;
        addToLists(valToAdd);
        acceptOperator = false;
        allowEquals = false;
    }
}

function equalsAction() {
    if (allowEquals) {
        valStack = getAllItems();
            while (valStack.length > 1) {
                let ans = operate(valStack[1],valStack[0],valStack[2]);
                roundedAns = Number.parseFloat(ans).toFixed(9);
                valStack[0] = `${+roundedAns}`;
                valStack.splice(1, 2);
            }
        answerGiven = true;
        allowEquals = false;
    }
}

function hasDecimal(item) {
    if (item.includes('.')) return true;
    return false;
}


function isOperator(item) {
    if (!item) return false;
    if ("-+/x".includes(item)) return true;
    return false;
}

function getAllItems() {
    let allItems = valList.match(itemRegex);
    console.log("regex results: " + allItems);
    return allItems
}

function decAction() {
    if (answerGiven) { 
        valList = '';
        answerGiven = false;
    }
    const valToAdd = '.'
    addToLists(valToAdd);
    acceptOperator = true;
}

function checkCurrentChar() {
    const currentChar = valList.slice(-1);
    console.log(currentChar);
    if (isOperator(currentChar)) {
        console.log(currentChar + " is an operator");
        allowEquals = false;
        acceptOperator = false;
    } else {
        console.log(currentChar + " NOT an operator");
        allowEquals = true;
        acceptOperator = true;
    }
    return currentChar
}

document.addEventListener('click', (e) => {
    const currentChar = checkCurrentChar();
    const buttonType = e.target.getAttribute('id');
    if (numberButtons.includes(e.target)) { 
        numberAction(e.target);
    } else if (buttonType == "btn-dec") {
        if (hasDecimal(currentChar)) return;
        decAction();
    } else if (buttonType == "btn-clear") {
        clearAll();
    }  else if (buttonType == "btn-back") {
        backAction();
    } else if (operatorButtons.includes(e.target)) {
        operatorAction(e.target);
    } else if (buttonType == "btn-equal") {
        equalsAction();
    } else return;
    updateDisplay();

    //console.log('=======' + e.target.getAttribute('id'))
    //console.log(`${valList} / ` + valStack);
});
