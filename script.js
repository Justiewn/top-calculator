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

function addToStack(val) {
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
    addToStack(valToAdd);
    acceptOperator = true;
}

function backAction() {
    answerGiven = false;
    let noSpaceList = valList.replace(' ',"").trim();
    let tempAllItems = getAllItems()
    let lastItem = noSpaceList.slice(-1);
    if (isOperator(lastItem)) {
        valList = valList.slice(0, -3)
    } else {
        valList = valList.slice(0, -1); 
    }
    let newLastItem = noSpaceList.slice(-2, -1);
    if (isOperator(newLastItem)) {
        acceptOperator = false;
        allowEquals = false;
    }
    else {
        acceptOperator = true;
        allowEquals = true;
    }
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
        allowEquals = false;
    }
}

function equalsAction() {
    if (allowEquals) {
        valStack = valList.split(' ');
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

function hasDecimal() {
    let currentNumber = getLastNumber(getAllItems());
    
    if (currentNumber.includes('.')) return true;
    return false;
}

function getLastNumber(items) {
    let allNums = items.filter( num => num.match(/[\d.]/g));
    let lastNumber = `${allNums[allNums.length - 1]}`;
    return lastNumber;
}

function isOperator(item) {
    if ("-+/x".includes(item)) return true;
    return false;
}

function getAllItems() {
    let tempList = valList.trim();
    let allItems = tempList.split(" ");
    return allItems
}

function decAction() {
    if (answerGiven) { 
        valList = '';
        answerGiven = false;
    }
    const valToAdd = '.'
    addToStack(valToAdd);
    acceptOperator = true;
}

document.addEventListener('click', (e) => {
    if (numberButtons.includes(e.target)) { 
        numberAction(e.target);
    } else if (e.target.getAttribute('id') == "btn-dec") {
        if (hasDecimal()) return;
        decAction();
    } else if (e.target.getAttribute('id') == "btn-clear") {
        clearAll();
    }  else if (e.target.getAttribute('id') == "btn-back") {
        backAction();
    } else if (operatorButtons.includes(e.target)) {
        operatorAction(e.target);
    } else if (e.target.getAttribute('id') == "btn-equal") {
        equalsAction();
    } else return;
    updateDisplay();

    console.log('=======' + e.target.getAttribute('id'))
    console.log(`${valList} / ` + valStack);
});
