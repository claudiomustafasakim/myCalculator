onload;
alert('clear')

class Calculator {
    constructor(previousOperantandText, currentOperantandText) {
        this.previousOperantandText = previousOperantandText
        this.currentOperantandText = currentOperantandText
        this.clear()
    }
    clear() {
        this.currentOperant = ''
        this.previousOperant = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperant = this.currentOperant.toString().slice(0, -1)

    }
    appentNumber(number) {
        if (number === '.' && this.currentOperant.includes('.')) return
        this.currentOperant = this.currentOperant.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperant === '') return
        if (this.previousOperant !== '') {
            this.compute()
        }

        this.operation = operation
        this.previousOperant = this.currentOperant
        this.currentOperant = ''

    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperant)
        const current = parseFloat(this.currentOperant)

        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break

            default:
                return
        }
        this.currentOperant = computation
        this.operation = undefined
        this.previousOperant = ''
    }


    updateDisplay() {

        this.currentOperantandText.innerText = this.currentOperant
        this.previousOperantandText.innerText = this.previousOperant
    }
}






const numberButtons = document.querySelectorAll(' [data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')

const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperantandText = document.querySelector('[data-previous-operant ]')
const currentOperantandText = document.querySelector('[data-current-operant]')


const calculator = new Calculator(previousOperantandText, currentOperantandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appentNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})