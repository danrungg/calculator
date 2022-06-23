let currentOperand = "";
let previousOperand = "";
let operationNew = undefined;

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous]");
const currentOperandTextElement = document.querySelector("[data-current]");

// functions
const clear = () => {
    currentOperand = "";
    previousOperand = "";
    operationNew = undefined;
};

const deleteChar = () => {
    currentOperand = currentOperand.toString().slice(0, -1);
};

const appendNumber = (number) => {
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand = currentOperand.toString() + number.toString();
};

const chooseOperation = (operation) => {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
        compute();
    }
    operationNew = operation;
    previousOperand = currentOperand;
    currentOperand = "";
};

const compute = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operationNew) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "*":
            computation = prev * current;
            break;
        case "÷":
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operationNew = undefined;
    previousOperand = "";
};

const updateDisplay = () => {
    currentOperandTextElement.textContent = currentOperand;

    if (operationNew != null) {
        previousOperandTextElement.textContent = `${previousOperand} ${operationNew}`;
    } else {
        previousOperandTextElement.textContent = "";
    }
};

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        appendNumber(button.textContent);
        updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        chooseOperation(button.textContent);
        updateDisplay();
    });
});

equalsButton.addEventListener("click", (button) => {
    compute();
    updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
    clear();
    updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
    deleteChar();
    updateDisplay();
});
