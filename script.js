let btns = document.querySelectorAll(".num-btn");
let allBtns = document.querySelector(".button");
let resultBox = document.querySelector("#result-box");
let clearAllBtn = document.querySelector('#clearAll');
let clearLastBtn = document.querySelector('#clearLast');
let paranthesisBtn = document.querySelector('#bracket');
let counter = 0;


let total = document.querySelector("#equals");

let btnSpread = [...btns];



btnSpread.forEach((button, i) => {
  button.addEventListener("click", () => {
    // Inner Values for calculator

    if (resultBox.innerHTML == "0") {
      resultBox.innerHTML = "";
    }

    let value = btns[i].innerHTML;
    resultBox.innerHTML += value;
  });
});


// Function to evalute Strings Input
const split = (expression, operator) => {
  const result = [];
  let bracket = 0;
  let curStream = "";
  for (let i = 0; i < expression.length; ++i) {
    const curCh = expression[i];
    if (curCh == '(') {
      bracket++;
    } else if (curCh == ')') {
      bracket--;
    }
    if (bracket == 0 && operator == curCh) {
      result.push(curStream);
      curStream = "";
    } else curStream += curCh;
  }
  if (curStream != "") {
    result.push(curStream);
  }
  return result;
};
//function for parsing "*" and "()"" in input string
const parseMultiplySeparatedExpression = (expression) => {
  const numbersString = split(expression, '*');
  const numbers = numbersString.map(noStr => {
    if (noStr[0] == '(') {
      const expr = noStr.substr(1, noStr.length - 2);
      // recursive call to the addition parsing function
      return parsePlusSeparatedExpression(expr);
    }
    return +noStr;
  });
  const initialValue = 1.0;
  const result = numbers.reduce((acc, no) => acc * no, initialValue);
  return result;
};
//function for parsing "/" in input string
const parseDivideSeparatedExpression = (expression) => {
  const numbersString = split(expression, '/');
  const numbers = numbersString.map(noStr => parseMultiplySeparatedExpression(noStr));
  const initialValue = numbers[0];
  const result = numbers.slice(1).reduce((acc, no) => acc / no, initialValue);
  return result;
};
//function for parsing "-" in input string
const parseMinusSeparatedExpression = (expression) => {
  const numbersString = split(expression, '-');
  const numbers = numbersString.map(noStr => parseDivideSeparatedExpression(noStr));
  const initialValue = numbers[0];
  const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
  return result;
};
////function for parsing "+" in input string 
const parsePlusSeparatedExpression = (expression) => {
  const numbersString = split(expression, '+');
  const numbers = numbersString.map(noStr => parseMinusSeparatedExpression(noStr));
  const initialValue = 0.0;
  const result = numbers.reduce((acc, no) => acc + no, initialValue);
  return result;
};
//main parse function that returns answer
const parseInput = (expression) => {
  const result = parsePlusSeparatedExpression(expression);
  return result;
};

// Calculates and prints the answer
total.addEventListener('click', () => {
  let input = resultBox.innerHTML;

  resultBox.innerHTML = parseInput(input);

  console.log(parseInput(input));
})

//Clears the last input from screen
clearLastBtn.addEventListener('click', () => {
  let x = resultBox.innerHTML;
  resultBox.innerHTML = x.slice(0, -1);
})

// Clears the whole input from screen
clearAllBtn.addEventListener('click', () => {
  resultBox.innerHTML = "0";
})

//Inputs either an opening or closing bracket each time
//button is pressed  
paranthesisBtn.addEventListener('click', () => {
  if (resultBox.innerHTML == '0') {
    resultBox.innerHTML = "";
    resultBox.innerHTML += "(";
    counter++;
  }
  else if (resultBox.innerHTML != '0') {
    if (counter % 2 == 0) {
      resultBox.innerHTML += '(';
      counter++;
    }
    else if (counter % 2 != 0) {
      resultBox.innerHTML += ')';
      counter=0;
    }
  }
})
