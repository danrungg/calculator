let currentOperand = "";
let previousOperand = "";
let operationNew = undefined;

const numberButtons = document.querySelectorAll("[data-number]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const operationButtons = document.querySelectorAll("[data-operation]");
const previousOperandText = document.querySelector("[data-previous]");
const currentOperandText = document.querySelector("[data-current]");

// functions
const clear = () => {
    currentOperand = "";
    previousOperand = "";
    operationNew = undefined;
};

const deleteChar = () => {
    currentOperand = currentOperand.toString().slice(0, -1);
};

const addChar = (number) => {
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand = currentOperand.toString() + number.toString();
};

const chooseOperation = (operation) => {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
        operate();
    }
    operationNew = operation;
    previousOperand = currentOperand;
    currentOperand = "";
};

const operate = () => {
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
    currentOperandText.textContent = currentOperand;

    if (operationNew != null) {
        previousOperandText.textContent = `${previousOperand} ${operationNew}`;
    } else {
        previousOperandText.textContent = "";
    }
};

// eventlistener
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        addChar(button.textContent);
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
    operate();
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
