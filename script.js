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
    if (+num2 == 0) {
        return "Error: Can't divide by zero"
    }
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
    lockScreen = false
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
        return [false,false]
    }
    else {
        // console.log(expressionArray[operatorIndex-1],expressionArray[operatorIndex],expressionArray[operatorIndex+1])
        let answer = operate(expressionArray[operatorIndex-1],expressionArray[operatorIndex],expressionArray[operatorIndex+1])
        if (!(typeof answer === 'number')) {
            resultDisplay.textContent = answer
            return [false,true]
        }
        expressionArray.splice(operatorIndex-1,3,answer)
        return [true,false]
    }
}

const solveExpression = function(expressionArray) {
    // console.log(expressionArray)
    if (expressionArray.length==1) {
        return true
    }
    else {
        let suspend = false
        for (let i=0;i<arithimeticOperators.length;i++) {
            let operator = arithimeticOperators[i]
            let operationRequired = true
            
            while (operationRequired) {
                operationResult = runArithemeticOperation(expressionArray,operator)
                operationRequired = operationResult[0]
                suspend = operationResult[1]
                if (suspend) {
                    console.log('suspended')
                    return false}
            }
            
        }
        solveExpression(expressionArray)
    }
    return true
    // console.log(expressionArray)
}

const evaluateExpression = function() {
    let expressionArray = new Array(exprssionDisplay.textContent)
    for (let i=0;i<arithimeticOperators.length;i++) {
        operator = arithimeticOperators[i]
        // console.log(operator)
        expressionArray = delineateExpressionArray(expressionArray,operator)
    }
    solved = solveExpression(expressionArray)
    if (solved) {resultDisplay.textContent = expressionArray[0]}
    lockScreen = true
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

const addArthOperatorToExpression = function(e) {
    // let currentExpression = exprssionDisplay.textContent
    choice = e.target.textContent
    if (lockScreen) {
        currentResult = resultDisplay.textContent
        if (!(isNaN(currentResult))) {
            console.log('result is number')
            clearScreen()
            exprssionDisplay.textContent = currentResult.toString() + choice
            return true
        }
        else {
            console.log('result is not number')
            return true
        }

    }
    exprssionDisplay.textContent += choice

}

const addNumToExpression = function(e) {
    choice = e.target.textContent
    if (!lockScreen) {exprssionDisplay.textContent += choice}
    
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
let lockScreen = false

createButtonsFromList(numList,numberButtonsContainer,addNumToExpression)
createButtonsFromList(arithimeticOperators,arithimeticOperatorsButtonsContainer,addArthOperatorToExpression)
createButtonsFromList(specialOperators,specialOperatorsButtonsContainer,runSpecialOperation)


// ignore the trailing operators at the end of expression when not closed by a number
// Prevent double adding of operators in the expression
// Allow for only one decimal point to be added
// Allow for the negative symbol button usage to toggle between positive and negative numbers
// Make the UI for the calculator
// Round Answers with at long decimals at 8 decimal points
// Can't push number buttons after result is display until result is clear
// Can push arithemtic buttons after result is display. This should move answer to expression followed by operator and allow for new expression
// Backspace button
// Keyboard support