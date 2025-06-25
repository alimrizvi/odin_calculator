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
    expressionDisplay.textContent = ''
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
    let currentExpression = expressionDisplay.textContent
    if (arithimeticOperators.includes(currentExpression.slice(-1))) {
        deleteLastCharacter()
    }
    let expressionArray = new Array(currentExpression)
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

const deleteLastCharacter = function() {
    let currentExpression = expressionDisplay.textContent
    expressionDisplay.textContent = currentExpression.slice(0,-1)
}


const addArthOperatorToExpression = function(e) {
    let currentExpression = expressionDisplay.textContent
    choice = e.target.textContent
    if (lockScreen) {
        currentResult = resultDisplay.textContent
        if (!(isNaN(currentResult))) {
            clearScreen()
            expressionDisplay.textContent = currentResult.toString() + choice
            return true
        }
        else {
            return true
        }

    }
    if (currentExpression.length > 0 & arithimeticOperators.includes(currentExpression.slice(-1))) {
        deleteLastCharacter()
    }
    expressionDisplay.textContent += choice
}

const testIfDecimalExists = function(test_str) {
    let operatorIndex = -1
    for (let i=test_str.length-1;i>=0;i--) {
        
        if (arithimeticOperators.includes(test_str[i])) {
            operatorIndex = i
            break;
        }
    }
    last_term  = test_str.slice(operatorIndex+1)

    return last_term.includes('.')

}

const addDecimalPoint = function() {
    let currentExpression = expressionDisplay.textContent
    if (!lockScreen) {
        if (currentExpression.length == 0) {
            expressionDisplay.textContent = '0.'
            return true
        }
        else if (arithimeticOperators.includes(currentExpression.slice(-1))) {
            expressionDisplay.textContent += '0.'
        }
        else if (testIfDecimalExists(currentExpression)) {
            return true
        }
        else {
            expressionDisplay.textContent += '.'
        }

    }
}

const addNumToExpression = function(e) {
    choice = e.target.textContent
    if (!lockScreen) {expressionDisplay.textContent += choice}
    
}

const runSpecialOperation = function(e) {
    const choice = e.target.textContent
    if (choice =='AC') {
        clearScreen()
    }
    else if (choice =='=') {
        evaluateExpression()
    }
    else if (choice =='⌫') {
        deleteLastCharacter()
    }
    else if (choice == '.') {
        addDecimalPoint()
    }
}
 
const expressionDisplayContainer = document.querySelector('#expression-display')
const resultDisplayContainer = document.querySelector('#result-display')

expressionDisplay = document.createElement('span')
resultDisplay = document.createElement('span')
expressionDisplayContainer.appendChild(expressionDisplay)
resultDisplayContainer.appendChild(resultDisplay)

const arithimeticOperators = ['/','*','+','-']
const specialOperators = ['AC','=','+/-','.','⌫']
const numList = [0,1,2,3,4,5,6,7,8,9]
const numberButtonsContainer = document.querySelector('#number-buttons')
const arithimeticOperatorsButtonsContainer = document.querySelector('#arithemitc-operator-buttons')
const specialOperatorsButtonsContainer = document.querySelector('#special-operator-buttons')
let lockScreen = false

createButtonsFromList(numList,numberButtonsContainer,addNumToExpression)
createButtonsFromList(arithimeticOperators,arithimeticOperatorsButtonsContainer,addArthOperatorToExpression)
createButtonsFromList(specialOperators,specialOperatorsButtonsContainer,runSpecialOperation)


// Allow for the negative symbol button usage to toggle between positive and negative numbers
// Round Answers with long decimals at 8 decimal points
// Make the UI for the calculator
// Keyboard support


test_str_decimal = '56+43+98-98.8'
test_str_clean = '56+43+98-98'




testIfDecimalExists(test_str_clean)
