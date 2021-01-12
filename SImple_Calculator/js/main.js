const calculator = {
  displayValue: '0',
  firstNum: null,
  waitingForSecondNum: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondNum } = calculator;

  if (waitingForSecondNum === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondNum = false;
  } else {
    // Overwrite 'displayValue' if the current value is '0', otherwise append to it
  calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  console.log(calculator);
}

function inputDecimal(dot) {
  // Fix decimal append bug
  if (calculator.waitingForSecondNum === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondNum = false
    return
  }

  // If the 'displayValue' property doesn't contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
  const { firstNum, displayValue, operator } = calculator
  // 'parseFloat' converts the strung contents of 'displayValue'
  // to a floating-point number
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondNum) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  // Verify that 'firstNum' is null and that the 'inputValue'
  // is not the 'NaN' value
  if (firstNum == null && !isNaN(inputValue)) {
    // Update firstNum property
    calculator.firstNum = inputValue;
  } else if (operator) {
    const result = calculate(firstNum, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(6))}`;;
    calculator.firstNum = result;
  }

  calculator.waitingForSecondNum = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstNum, secondNum, operator) {
  if (operator === '+') {
    return firstNum + secondNum;
  } else if (operator === '-') {
    return firstNum - secondNum;
  } else if (operator === '*') {
    return firstNum * secondNum;
  } else if (operator === '/') {
    return firstNum / secondNum;
  }
  return secondNum;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstNum = null;
  calculator.waitingForSecondNum = false;
  calculator.operator = null;
  console.log(calculator);
}

function updateDisplay() {
  // Select the element with class of 'calculator-screen'
  const display = document.querySelector('.calculator-screen');
  // Update the value of the element with the contents of 'displayValue'
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (Event) => {
  // Access the clicked element
  const { target } = Event;

  // Check if clicked element is a button, 
  // if not exit function
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});