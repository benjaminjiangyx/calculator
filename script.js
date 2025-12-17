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

function handleNumber(number) {
  console.log("Number clicked:", number);
  if (operator === null) {
    // We are building num1
    if (num1 === null) {
      num1 = number;
    } else {
      num1 += number;
    }
  } else {
    // We are building num2
    if (num2 === null) {
      num2 = number;
    } else {
      num2 += number;
    }
  }
  updateDisplay(operator === null ? num1 : num2);
}

function handleOperator(op) {
  console.log("Operator clicked:", op);
  operator = op;
  updateDisplay(operator);
}

function handleEquals() {
  console.log("Equals clicked");
  if (num1 !== null && num2 !== null && operator !== null) {
    const result = calculate(parseFloat(num1), parseFloat(num2), operator);
    updateDisplay(result);
    // Reset for next calculation
    num1 = result.toString();
    num2 = null;
    operator = null;
  }
}

function handleClear() {
  console.log("Clear clicked");
  num1 = null;
  num2 = null;
  operator = null;
  updateDisplay("0");
}

function updateDisplay(value) {
  const display = document.getElementById("display");
  display.textContent = value;
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
