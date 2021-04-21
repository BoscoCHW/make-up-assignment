let budgetAmount = 0
let expanseItems = []

function budgetTemplate(amount) {
    return `<div class="budget-display">
                <p>My Budget: ${amount}</p>
                <P>current remaining budget: <span id="remaining-budget">${amount}</span></P>
            </div>`
}

const createBudgetbtn = document.querySelector('#create-budget')
createBudgetbtn.addEventListener('click', displayBudget)
document.querySelector('#budget').addEventListener('keypress', displayBudget)

function displayBudget(e) {

    if (e.key === 'Enter' || e.type === 'click') {
        let budgetDisplayDiv = document.querySelector('.budget-display')
        if (!budgetDisplayDiv) {
            const budgetInput = document.querySelector('#budget')
            const budgetAmount = budgetInput.valueAsNumber
            const budgetAmountStr = budgetAmount.toFixed(2)
            setBudget(budgetAmount)
            const appWrapperDiv = document.querySelector('.app-wrapper')
            appWrapperDiv.insertAdjacentHTML('beforeend', budgetTemplate(budgetAmountStr))
            budgetInput.value = ''
        } else {
            alert('You already have a budget!')
        }
    }
    
}

const createItembtn = document.querySelector('#create-item')
createItembtn.addEventListener('click', displayExpanseItem)
document.querySelector('#expanse-amount').addEventListener('keypress', displayExpanseItem)

function displayExpanseItem(e) {
    if (e.key === 'Enter' || e.type === 'click') {
        const expanseItemInput = document.querySelector('#expanse-item')
        const expanseAmountInput = document.querySelector('#expanse-amount')

        const expanseItem = expanseItemInput.value
        const expanseAmountRaw = expanseAmountInput.valueAsNumber

        if (expanseItem && expanseAmountRaw) {
            const expanseAmount = expanseAmountRaw.toFixed(2)
            let expanseItems = addExpanseItem(expanseItem, Number(expanseAmount))
            let remainingBudget = calRemain(expanseItems)
            

            const budgetDisplayDiv = document.querySelector('.budget-display')
            let expanseItemUl = budgetDisplayDiv.querySelector('.expanse-items')
            if (!expanseItemUl) {
                expanseItemUl = document.createElement('ul')
                expanseItemUl.classList = 'expanse-items'
                expanseItemUl.innerHTML = `<li class="expanse-item">${expanseAmount} ${expanseItem}</li>`
                budgetDisplayDiv.appendChild(expanseItemUl)
                
            } else {
                expanseItemLi = document.createElement('li')
                expanseItemLi.classList = 'expanse-item'
                expanseItemLi.textContent = `${expanseAmount} ${expanseItem}`
                expanseItemUl.appendChild(expanseItemLi)
                // console.log('have expanse item list')
            }

            const remainBudgetSpan = budgetDisplayDiv.querySelector('#remaining-budget')
            remainBudgetSpan.textContent = remainingBudget.toFixed(2)
            expanseItemInput.value = ''
            expanseAmountInput.value = ''

        } else {
            alert('Invalid input')
        }
    }
    

}

function setBudget(amount) {
    budgetAmount = amount
}


function addExpanseItem(item, amount) {
    expanseItems.push({item, amount})
    return expanseItems
}

function calRemain(items) {
    let remainingBudget = budgetAmount
    for(item of items) {
        remainingBudget -= item.amount
    }
    return remainingBudget
}
