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

const MAX_DIGITS = 12;

function updateDisplay(){

    prev_display.textContent = previousInput || "0";
    curr_display.textContent = currentInput || "0";

    curr_display.scrollLeft = curr_display.scrollWidth;
}

function appendDigits(digit){
    if(currentInput.length >= MAX_DIGITS) return;

    currentInput += digit;
    updateDisplay();
}

//numbers:

nine.addEventListener("click", () => {
    appendDigits("9");
});

eight.addEventListener("click", () => {
    appendDigits("8");
});

seven.addEventListener("click", () => {
    appendDigits("7");
});

six.addEventListener("click", () => {
    appendDigits("6");
});

five.addEventListener("click", () => {
    appendDigits("5");
});

four.addEventListener("click", () => {
    appendDigits("4");
});

three.addEventListener("click", () => {
   appendDigits("3");
});

two.addEventListener("click", () => {
    appendDigits("2");
});
one.addEventListener("click", () => {
    appendDigits("1");
});

zero.addEventListener("click", () => {
    appendDigits("0");
});
//operators

addition.addEventListener("click", () => {
    appendDigits("+");
})

subtraction.addEventListener("click", () => {
    appendDigits("-");
})

multiply.addEventListener("click", () => {
    appendDigits('\u00D7');
    
});

divide.addEventListener("click", () => {
    appendDigits('\u00F7');

});

percentage.addEventListener("click", () => {
    appendDigits('%');
});

decimal.addEventListener("click", () => {
    appendDigits('.');

});


open_bracket.addEventListener("click", () => {
    appendDigits("(");
})

close_bracket.addEventListener("click", () => {
    appendDigits(")");

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

function formatResult(result){
    const num = Number(result);

    if(isNaN(num)) return "Error";

    if(Math.abs(num) >= 1e11 || (Math.abs(num) < 1e-6 && num !==0)){
        return num.toExponential(6);
    }

    return Number(Math.round(num + "e8") + "e-8").toString();
}

equals.addEventListener('click', () =>{
    
    if(!currentInput) return;
    
    try{
        previousInput = currentInput + "=";
        let result = safeCalculate(currentInput);
        let formattedresult = formatResult(result);
        currentInput = formattedresult.toString();

    } catch (error){
        currentInput = "Error";
    }
    updateDisplay();
});