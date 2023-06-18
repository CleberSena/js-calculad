
const numberButtons = document.querySelectorAll(".num")
const operationButtons = document.querySelectorAll(".operador")
const equalsButtons = document.querySelector('#igualdade')
const allClearButtons = document.querySelector('[data-all-clear]')
const deleteButons = document.querySelector('[data-delete ]')
const porcentagemButton = document.querySelector('[data-porcentagem]')
const previousOperandTextElement = document.querySelector('[data-previous-operend]')
const currentOperandTextElement = document.querySelector('[data-current-operend]')

class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
            this.previousOperandTextElement = previousOperandTextElement
            this.currentOperandTextElement = currentOperandTextElement 
            this.clear()          
        }

        formaDisplayNumber(number){
            const stringNumber = number.toString()

            const integerDigits = parseFloat(stringNumber.split('.')[0])
            const decimalDigits = stringNumber.split('.')[1] 
            
            let integerDisplay

            if(isNaN(integerDigits)){
                integerDisplay = ''
            }else{
                integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
            }

            if(decimalDigits != null){
                return `${integerDisplay}.${decimalDigits}`
            }else{
                return integerDisplay
            }
        }

        delete(){
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
        }

        calculate(){
            let result
            const previousOperandFloat = parseFloat(this.previousOperand)
            const currentOperandFloat = parseFloat(this.currentOperand)

            if(isNaN(previousOperandFloat) || isNaN(currentOperandFloat))return

            switch(this.operation){
                case '+':
                    result = previousOperandFloat + currentOperandFloat
                        break
                
                case '-':
                    result = previousOperandFloat - currentOperandFloat
                        break
                
                case '/':
                    result = previousOperandFloat / currentOperandFloat
                        break
                
                case '*': 
                    result = previousOperandFloat * currentOperandFloat
                        break                
                        default:
                            return
            }

            this.currentOperand = result
            this.operation = undefined
            this.previousOperand = ''
        }

        chooseOperation(operation){
            if(this.currentOperand === '') return

            if(this.previousOperand !== ''){
                this.calculate( )
            }

            this.operation = operation

            this.previousOperand = this.currentOperand
            this.currentOperand = ''
        }

        appendNumber(number){
            if(this.currentOperand.includes('.') && number === '.') return
            this.currentOperand = `${this.currentOperand}${number.toString()}`
        }

        clear(){
            this.currentOperand= ''
            this.previousOperand= ''
            this.operation= undefined
        }
        updateDisplay(){
            this.previousOperandTextElement.innerText = `${this.formaDisplayNumber(this.previousOperand)}${this.operation || ''}`
            this.currentOperandTextElement.innerText = this.formaDisplayNumber(this.currentOperand)
        }
    }

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

for(const numberButton of numberButtons){
    numberButton.addEventListener('click', ()=>{
        calculator.appendNumber(numberButton.innerText)
        calculator.updateDisplay()
    })
}

for(const operationButton of operationButtons){
    operationButton.addEventListener('click', ()=>{
        calculator.chooseOperation(operationButton.innerText)
        calculator.updateDisplay()
    })    
}

allClearButtons.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})

 equalsButtons.addEventListener('click', ()=>{
    calculator.calculate()
    calculator.updateDisplay()
 })

 deleteButons.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
 })


