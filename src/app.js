const createBudgetbtn = document.querySelector('#create-budget')
createBudgetbtn.addEventListener('click', () => {
    const budgetInput = document.querySelector('#budget')
    const budgetAmount = budgetInput.valueAsNumber
    const budgetAmountStr = budgetAmount.toFixed(2)

    setBudget(budgetAmount)

    const appWrapperDiv = document.querySelector('.app-wrapper')
    
    let budgetDisplayDiv = document.querySelector('.budget-display')
    if (!budgetDisplayDiv) {
        budgetDisplayDiv = document.createElement('div')
        budgetDisplayDiv.classList = "budget-display"
        budgetDisplayDiv.innerHTML = `<p>My Budget: ${budgetAmountStr}</p>
                                        <P>current remaining budget: <span id="remaining-budget">${budgetAmountStr}</span></P>`
        appWrapperDiv.appendChild(budgetDisplayDiv)
        budgetInput.value = ''
    } else {
        console.log('hi')
    }
})

const createItembtn = document.querySelector('#create-item')
createItembtn.addEventListener('click', () => {
    const expanseItemInput = document.querySelector('#expanse-item')
    const expanseItem = expanseItemInput.value

    const expanseAmountInput = document.querySelector('#expanse-amount')
    const expanseAmount = expanseAmountInput.valueAsNumber.toFixed(2)

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

})

let budgetAmount = 0
function setBudget(amount) {
    budgetAmount = amount
}


let expanseItems = []
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
