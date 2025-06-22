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

const createButtonsFromList = function(buttonList,buttonContainer,clickFunction) {
    for (j=0;j<buttonList.length;j++) {
        let tempButton = document.createElement('button')
        tempButton.textContent = buttonList[j]
        tempButton.addEventListener('click',clickFunction)
        buttonContainer.appendChild(tempButton)
    }
}

const runSpecialOperation = function(e) {
    const choice = e.target.textContent
    console.log(choice)
    if (choice =='AC') {
        exprssionDisplay.textContent = ' '
        resultDisplay.textContent = ' '
    }
}

const addNumToExpression = function(e) {
    choice = e.target.textContent
    exprssionDisplay.textContent += choice
}
 
const expressionDisplayContainer = document.querySelector('#expression-display')
const resultDisplayContainer = document.querySelector('#result-display')

exprssionDisplay = document.createElement('span')
resultDisplay = document.createElement('span')
exprssionDisplay.textContent = '5+4'
resultDisplay.textContent =  '9'
expressionDisplayContainer.appendChild(exprssionDisplay)
resultDisplayContainer.appendChild(resultDisplay)

const arithimeticOperators = ['+','-','*','/']
const specialOperators = ['AC','=','+/-','.']
const numList = [0,1,2,3,4,5,6,7,8,9]
const numberButtonsContainer = document.querySelector('#number-buttons')
const arithimeticOperatorsButtonsContainer = document.querySelector('#arithemitc-operator-buttons')
const specialOperatorsButtonsContainer = document.querySelector('#special-operator-buttons')

createButtonsFromList(numList,numberButtonsContainer,addNumToExpression)
createButtonsFromList(arithimeticOperators,arithimeticOperatorsButtonsContainer,addNumToExpression)
createButtonsFromList(specialOperators,specialOperatorsButtonsContainer,runSpecialOperation)



