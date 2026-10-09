//console.log("Javascript is running");

let clear = document.getElementById("clear");
let open_bracket = document.getElementById("open-bracket");
let close_bracket = document.getElementById("close-bracket");
let divide = document.getElementById("division");

let seven = document.getElementById("seven");
let eight = document.getElementById("eight");
let nine = document.getElementById("nine");
let multiply = document.getElementById("multiply");

let four = document.getElementById("four");
let five = document.getElementById("five");
let six = document.getElementById("six");
let subtraction = document.getElementById("minus");

let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let addition = document.getElementById("plus");

let zero = document.getElementById("zero");
let percentage = document.getElementById("percentage");
let decimal = document.getElementById("decimal");
let equals = document.getElementById("equals");

let prev_display = document.getElementById("previous-operand");
let curr_display = document.getElementById("current-operand");

let currentInput = "";
let previousInput = "";


function updateDisplay(){

    prev_display.textContent = previousInput || "0";
    curr_display.textContent = currentInput || "0";
}


//numbers:

nine.addEventListener("click", () => {
    console.log("9");
    currentInput += "9";
    updateDisplay();
});

eight.addEventListener("click", () => {
    console.log("8");
    currentInput += "8";
    updateDisplay();
});

seven.addEventListener("click", () => {
    console.log("7");
    currentInput += "7";
    updateDisplay();
});

six.addEventListener("click", () => {
    currentInput += "6";
    updateDisplay();
});

five.addEventListener("click", () => {
    currentInput += "5";
    updateDisplay();
});

four.addEventListener("click", () => {
    currentInput += "4";
    updateDisplay();
});

three.addEventListener("click", () => {
    currentInput += "3";
    updateDisplay();
});

two.addEventListener("click", () => {
    currentInput += "2";
    updateDisplay();
})
one.addEventListener("click", () => {
    currentInput += "7";
    updateDisplay();
})

//operators

addition.addEventListener("click", () => {
    currentInput += "+";
    updateDisplay();
})

subtraction.addEventListener("click", () => {
    currentInput += "-";
    updateDisplay();
})

multiply.addEventListener("click", () => {
    currentInput += '\u00D7';
    updateDisplay();
});

divide.addEventListener("click", () => {
    currentInput += '\u00F7';
    updateDisplay();
});

percentage.addEventListener("click", () => {
    currentInput += '%';
    updateDisplay();
});

decimal.addEventListener("click", () => {
    currentInput += '.';
    updateDisplay();
});


open_bracket.addEventListener("click", () => {
    currentInput += "(";
    updateDisplay();
})

close_bracket.addEventListener("click", () => {
    currentInput += ")";
    updateDisplay();
});


clear.addEventListener("click", () =>{
    console.log("clearing display");
    previousInput = "";
    currentInput = "";
    updateDisplay();
})


function safeCalculate(expression){

    let formattedexpression = expression
        .replace(/÷/g,"/") 
        .replace(/×/g,"*")
        .replace(/(\d+(\.\d+)?)%/g,"($1/100)");

    //let expressionMultiply = currentInput.replace(/×/g,"*");

    const isValidMath = /^[0-9+\-*/.() ]+$/.test(formattedexpression);

    if(!isValidMath){
        throw new Error("Invalid Input");
    }

    return new Function(`'use strict'; return (${formattedexpression})`)();
}

equals.addEventListener('click', () =>{
    
    if(!currentInput) return;
    
    try{
        previousInput = currentInput + "=";
        let result = safeCalculate(currentInput);
        currentInput = result.toString();

    } catch (error){
        currentInput = "Error";
    }
    updateDisplay();
});