function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  if (num2 === 0) {
    throw new Error("Cannot divide by zero");
  }
  return num1 / num2;
}
function calculate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      throw new Error("Invalid operator");
  }
}

let num1 = null;
let num2 = null;
let operator = null;
let justCalculated = false;

function handleNumber(number) {
  console.log("Number clicked:", number);
  if (justCalculated) {
    // Start fresh calculation after equals was pressed
    num1 = number;
    operator = null;
    num2 = null;
    justCalculated = false;
    updateDisplay(num1);
  } else if (operator === null) {
    // We are building num1
    if (num1 === null) {
      num1 = number;
    } else {
      num1 = num1 + number;
    }
    updateDisplay(num1);
  } else {
    // We are building num2
    if (num2 === null) {
      num2 = number;
    } else {
      num2 = num2 + number;
    }
    updateDisplay(num2);
  }
}

function handleOperator(op) {
  console.log("Operator clicked:", op);
  if (justCalculated) {
    // Continue with the result from previous calculation
    justCalculated = false;
    operator = op;
    updateDisplay(operator);
  } else if (op !== null && num2 !== null) {
    // If num2 is already set, calculate intermediate result
    try {
      const result = calculate(parseFloat(num1), parseFloat(num2), operator);
      num1 = result.toString();
      num2 = null;
      updateDisplay(num1);
      operator = op;
    } catch (error) {
      updateDisplay("Error: " + error.message);
      num1 = null;
      num2 = null;
      operator = null;
      justCalculated = false;
      return;
    }
  } else {
    operator = op;
    updateDisplay(operator);
  }
}

function handleEquals() {
  console.log("Equals clicked");
  if (num1 !== null && num2 !== null && operator !== null) {
    try {
      const result = calculate(parseFloat(num1), parseFloat(num2), operator);
      updateDisplay(result);
      // Reset for next calculation
      num1 = result.toString();
      num2 = null;
      operator = null;
      justCalculated = true;
    } catch (error) {
      updateDisplay("Error: " + error.message);
      // Reset calculator after error
      num1 = null;
      num2 = null;
      operator = null;
      justCalculated = false;
    }
  }
}

function handleClear() {
  console.log("Clear clicked");
  num1 = null;
  num2 = null;
  operator = null;
  justCalculated = false;
  updateDisplay("0");
}

function updateDisplay(value) {
  const display = document.getElementById("display");
  display.value = value;
}

addEventListener("click", function (event) {
  if (event.target.matches(".num")) {
    handleNumber(event.target.textContent);
  } else if (event.target.matches(".operator")) {
    handleOperator(event.target.textContent);
  } else if (event.target.matches("#equals")) {
    handleEquals();
  } else if (event.target.matches("#clear")) {
    handleClear();
  }
});
