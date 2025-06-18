const add = function(num1,num2) {
    return num1 + num2
}

const subtract = function(num1,num2) {
    return num1 - num2
}

const multiply = function(num1,num2) {
    return num1 * num2
}

const divide = function(num1,num2) {
    return num1 / num2
}

const operate = function(num1,operator,num2) {
    if (operator=='+') {
        return add(num1,num2)
    }
    else if (operator=='-') {
        return subtract(num1,num2)
    }
    else if (operator=='*') {
        return multiply(num1,num2)
    }
    else if (operator=='/') {
        return divide(num1,num2)
    }
    else {return "Error"}
}

console.log(operate(4,'+',2))
console.log(operate(4,'-',2))
console.log(operate(4,'*',2))
console.log(operate(4,'/',2))