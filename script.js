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
        return checkDecimalPlaces(add(num1,num2))
    }
    else if (operator=='-') {
        return checkDecimalPlaces(subtract(num1,num2))
    }
    else if (operator=='x') {
        return checkDecimalPlaces(multiply(num1,num2))
    }
    else if (operator=='÷') {
        return checkDecimalPlaces(divide(num1,num2))
    }
    else {return "Error"}

}

const checkDecimalPlaces = function(num) {
    const numStr = num.toString()
    const decimalIndex = numStr.indexOf('.')
    if (decimalIndex== -1 ) {
        return num
    }
    else {
        decimalPlaces = numStr.length - decimalIndex + 1
        if (decimalPlaces <= 8) {
            return num
            }
        else {
            return Math.round(num * 100000000) / 100000000
        }
    }
}

const createButtonsFromList = function(buttonList,clickFunction) {
    for (j=0;j<buttonList.length;j++) {
        let tempButton = document.createElement('button')
        let buttonText = buttonList[j]
        tempButton.textContent = buttonText
        tempButton.addEventListener('click',clickFunction)
        const buttonObject = {[buttonText]:tempButton}
        buttonObjectList.push(buttonObject)
    }
}

const clearScreen = function() {
    expressionDisplay.textContent = ''
    resultDisplay.textContent = ''
    lockScreen = false
}

const fixHoles = function(array) {
    if (array.indexOf('') == -1) {
        return array
    }
    let holeIndex = array.indexOf('')
    let nextNum = array[holeIndex+2]
    array.splice(holeIndex,3,nextNum,'x','-1')
    fixHoles(array)
    
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
                    return false}
            }
            
        }
        solveExpression(expressionArray)
    }
    return true
}

const evaluateExpression = function() {
    let currentExpression = expressionDisplay.textContent
    if (arithimeticOperators.includes(currentExpression.slice(-1))) {
        deleteLastCharacter()
        currentExpression = expressionDisplay.textContent
    }
    let expressionArray = new Array(currentExpression)
    for (let i=0;i<arithimeticOperators.length;i++) {
        operator = arithimeticOperators[i]
        expressionArray = delineateExpressionArray(expressionArray,operator)
    }
    fixHoles(expressionArray)
    solved = solveExpression(expressionArray)
    if (solved) {resultDisplay.textContent = expressionArray[0]}
    lockScreen = true
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
    else if (currentExpression.length == 0) {
        return true
    }
    expressionDisplay.textContent += choice
}

const findLastTerm = function (test_str) {
    let operatorIndex = -1
    for (let i=test_str.length-1;i>=0;i--) {
        
        if (arithimeticOperators.includes(test_str[i])) {
            operatorIndex = i
            break;
        }
    }
    lastTerm  = test_str.slice(operatorIndex+1)
    return lastTerm
}

const testIfDecimalExists = function(test_str) {
    lastTerm = findLastTerm(test_str)

    return lastTerm.includes('.')

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

const runNegativeOperator = function() {
    let currentExpression = expressionDisplay.textContent
    let lastTerm = findLastTerm(currentExpression)
    lastTermIndex = currentExpression.lastIndexOf(lastTerm)
    prevTerms = currentExpression.slice(0,lastTermIndex)
    
    if (prevTerms.slice(-1) == '-' &  (prevTerms.length == 1 | arithimeticOperators.includes(prevTerms.slice(-2,-1)))) {
        expressionDisplay.textContent = prevTerms.slice(0,-1) + lastTerm
    }
    else {
        expressionDisplay.textContent = prevTerms + '-' + lastTerm
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
    else if (choice == '+/-') {
        runNegativeOperator()
    }

}

const placeButtons = function(mapLists,buttonObjectList) {
    for (const map of mapLists ) {
        for (let element of map['list']) {
            let obj = buttonObjectList.find(x => element in x)
            tempButton = obj[element]
            map['container'].appendChild(tempButton)
        }
    }
}

const mapAdditionalKeys = function(additionalKeyMappings) {
    for (const keyMap of additionalKeyMappings) {
        const newKey = keyMap['key']
        const mapsTo = keyMap['mapTo']
        let obj = buttonObjectList.find(x => mapsTo in x)
        const tempButton = obj[mapsTo]
        const newButtonObject = {[newKey]:tempButton}
        buttonObjectList.push(newButtonObject)
    }
}
 
const expressionDisplayContainer = document.querySelector('#expression-display')
const resultDisplayContainer = document.querySelector('#result-display')

const expressionDisplay = document.createElement('span')
const resultDisplay = document.createElement('span')
expressionDisplayContainer.appendChild(expressionDisplay)
resultDisplayContainer.appendChild(resultDisplay)

const buttonObjectList = []
const arithimeticOperators = ['÷','x','+','-']
const specialOperators = ['AC','=','+/-','.','⌫']
const numList = [0,1,2,3,4,5,6,7,8,9]

const topLeftContainer = document.querySelector('#top-left')
const midLeftContainer = document.querySelector('#mid-left')
const bottomLeftContainer = document.querySelector('#bottom-left')
const rightColContainer = document.querySelector('#right-col')
const mapLists = [
    {'container':midLeftContainer,'list':[7,8,9,4,5,6,1,2,3]},
    {'container':bottomLeftContainer,'list':['+/-',0,'.']},
    {'container':topLeftContainer,'list':['AC','⌫']},
    {'container':rightColContainer,'list':['÷','x','+','-','=']},
    ]
let lockScreen = false
const additionalKeyMappings = [
    {'key':'*','mapTo':'x'},
    {'key':'/','mapTo':'÷'},
    {'key':'Backspace','mapTo':'⌫'},
    {'key':'Enter','mapTo':'='},
    {'key':'_','mapTo':'+/-'},
    {'key':'Escape','mapTo':'AC'},
]

createButtonsFromList(numList,addNumToExpression)
createButtonsFromList(arithimeticOperators,addArthOperatorToExpression)
createButtonsFromList(specialOperators,runSpecialOperation)
placeButtons(mapLists,buttonObjectList)
mapAdditionalKeys(additionalKeyMappings)

document.addEventListener("keydown", function(event) {
    let obj = buttonObjectList.find(x => event.key in x)
        obj[event.key].click()
    }
)
