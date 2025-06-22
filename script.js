const add = function(num1,num2) {
    return +num1 + +num2
}

const subtract = function(num1,num2) {
    return +num1 - +num2
}

const multiply = function(num1,num2) {
    return +num1 * +num2
}

const divide = function(num1,num2) {
    return +num1 / +num2
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

const clearScreen = function() {
    exprssionDisplay.textContent = ''
    resultDisplay.textContent = ''
}

const delineateExpressionArray = function(expressionArray,operator) {
    let resultArray = []
    for (let n=0;n<expressionArray.length;n++) {
        splitArray = expressionArray[n].split(operator)
        let splitIndex = 1
        for (let i=0;i<splitArray.length;i++) {
            if (splitIndex<splitArray.length) {
                splitArray.splice(splitIndex,0,operator)
            }
            splitIndex += 2
        }
        resultArray.push(splitArray)
    }
    return resultArray.flat()
}

const runArithemeticOperation = function(expressionArray,operator) {
    let operatorIndex = expressionArray.indexOf(operator)
    if (operatorIndex==-1) {
        return false
    }
    else {
        // console.log(expressionArray[operatorIndex-1],expressionArray[operatorIndex],expressionArray[operatorIndex+1])
        let answer = operate(expressionArray[operatorIndex-1],expressionArray[operatorIndex],expressionArray[operatorIndex+1])
        expressionArray.splice(operatorIndex-1,3,answer)
        return true
    }
}

const solveExpression = function(expressionArray) {
    // console.log(expressionArray)
    if (expressionArray.length==1) {
        return true
    }
    else {
        for (let i=0;i<arithimeticOperators.length;i++) {
            let operator = arithimeticOperators[i]
            let operationRequired = true
            while (operationRequired) {
                operationRequired = runArithemeticOperation(expressionArray,operator)
            }
            
        }
        solveExpression(expressionArray)
    }
        
    // console.log(expressionArray)
}

const evaluateExpression = function() {
    let expressionArray = new Array(exprssionDisplay.textContent)
    for (let i=0;i<arithimeticOperators.length;i++) {
        operator = arithimeticOperators[i]
        // console.log(operator)
        expressionArray = delineateExpressionArray(expressionArray,operator)
    }
    solveExpression(expressionArray)
    resultDisplay.textContent = expressionArray[0]
    // console.log(expressionArray)
}



const runSpecialOperation = function(e) {
    const choice = e.target.textContent
    if (choice =='AC') {
        clearScreen()
    }
    else if (choice =='=') {
        evaluateExpression()
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
expressionDisplayContainer.appendChild(exprssionDisplay)
resultDisplayContainer.appendChild(resultDisplay)

const arithimeticOperators = ['/','*','+','-']
const specialOperators = ['AC','=','+/-','.']
const numList = [0,1,2,3,4,5,6,7,8,9]
const numberButtonsContainer = document.querySelector('#number-buttons')
const arithimeticOperatorsButtonsContainer = document.querySelector('#arithemitc-operator-buttons')
const specialOperatorsButtonsContainer = document.querySelector('#special-operator-buttons')

createButtonsFromList(numList,numberButtonsContainer,addNumToExpression)
createButtonsFromList(arithimeticOperators,arithimeticOperatorsButtonsContainer,addNumToExpression)
createButtonsFromList(specialOperators,specialOperatorsButtonsContainer,runSpecialOperation)



