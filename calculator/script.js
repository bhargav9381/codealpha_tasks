const display = document.getElementById("display");
const previousDisplay = document.getElementById("previous-display");

let currentInput = "";
let previousInput = "";
let operator = null;
let shouldResetDisplay = false;


// Add number to display
function appendNumber(number) {

    if (shouldResetDisplay) {
        currentInput = "";
        shouldResetDisplay = false;
    }

    // Prevent multiple decimal points
    if (number === "." && currentInput.includes(".")) {
        return;
    }

    // Prevent multiple leading zeros
    if (currentInput === "0" && number !== ".") {
        currentInput = "";
    }

    currentInput += number;

    updateDisplay();
}


// Select operator
function chooseOperator(selectedOperator) {

    if (currentInput === "" && previousInput === "") {
        return;
    }

    if (currentInput !== "" && previousInput !== "") {
        calculate();
    }

    if (currentInput !== "") {
        previousInput = currentInput;
    }

    operator = selectedOperator;

    previousDisplay.textContent =
        `${previousInput} ${getOperatorSymbol(operator)}`;

    shouldResetDisplay = true;
}


// Calculate result
function calculate() {

    if (previousInput === "" || currentInput === "" || operator === null) {
        return;
    }

    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    let result;

    switch (operator) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":

            if (current === 0) {
                display.value = "Error";
                currentInput = "";
                previousInput = "";
                operator = null;
                return;
            }

            result = previous / current;
            break;

        case "%":
            result = previous % current;
            break;

        default:
            return;
    }

    // Round long decimal values
    result = parseFloat(result.toFixed(10));

    currentInput = result.toString();

    previousInput = "";
    operator = null;

    previousDisplay.textContent = "";

    updateDisplay();

    shouldResetDisplay = true;
}


// Clear calculator
function clearDisplay() {

    currentInput = "";
    previousInput = "";
    operator = null;

    display.value = "0";

    previousDisplay.textContent = "";
}


// Delete last number
function deleteLast() {

    if (shouldResetDisplay) {
        return;
    }

    currentInput = currentInput.slice(0, -1);

    if (currentInput === "") {
        display.value = "0";
    } else {
        updateDisplay();
    }
}


// Update display
function updateDisplay() {

    display.value = currentInput || "0";
}


// Convert operator symbols
function getOperatorSymbol(operator) {

    switch (operator) {

        case "+":
            return "+";

        case "-":
            return "−";

        case "*":
            return "×";

        case "/":
            return "÷";

        case "%":
            return "%";

        default:
            return "";
    }
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Numbers
    if (key >= "0" && key <= "9") {
        appendNumber(key);
    }

    // Decimal
    else if (key === ".") {
        appendNumber(".");
    }

    // Operators
    else if (key === "+") {
        chooseOperator("+");
    }

    else if (key === "-") {
        chooseOperator("-");
    }

    else if (key === "*") {
        chooseOperator("*");
    }

    else if (key === "/") {

        event.preventDefault();

        chooseOperator("/");
    }

    else if (key === "%") {
        chooseOperator("%");
    }

    // Enter or =
    else if (key === "Enter" || key === "=") {
        calculate();
    }

    // Backspace
    else if (key === "Backspace") {
        deleteLast();
    }

    // Escape
    else if (key === "Escape") {
        clearDisplay();
    }

});