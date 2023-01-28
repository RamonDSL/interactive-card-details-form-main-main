const form = document.querySelector('form')
const cardNumber = document.querySelector('.card-number')
const cardName = document.querySelector('.card-Name')
const cardDate = document.querySelector('.card-Date')
const cardCVC = document.querySelector('.cvc')
const sectComplete = document.querySelector('.complete')
const sectForm = document.querySelector('.form')
const continue_btn = document.querySelector('.continue')

// válidação dos inputs
function validaNome(event) {
    let erro = true 

    if (form[0].value.length == 0) {
        setError(form[0], "Campo Obrigatório")
    } else if (form[0].value.length < 2) {
        setError(form[0], "Digite um nome com pelo menos 2 caracteres")
    } else if (!isName(form[0].value)) {
        setError(form[0], "Cada parte do nome deve ter pelo menos 2 caracteres um espaço entre eles e apenas letras")
    } else {
        setSuccess(form[0])
        erro = false
    }

    if (event.type == 'submit') {
        if (!erro) return false
    }
}

function validaCardNumber(event) {
    let erro = true 

    if (form[1].value.length == 0) {
        setError(form[1], "Campo Obrigatório")
    } else if (!isCardNumber(form[1].value)) {
        setError(form[1], "Digite um número de cartão válido")
    } else {
        setSuccess(form[1])
        erro = false
    }

    if (event.type == 'submit') {
        if (!erro) return false
    }
}

function vaildaMes(event) {
    let erro = true 

    if (form[2].value.length == 0) {
        setError(form[2], "Campos de data Obrigatório")
    } else if (!isNumber(form[2].value)) {
        setError(form[2], "Digite apenas números nas datas")
    } else if(form[2].value < 1 || form[2].value > 12) {
        setError(form[2], "Digite um mês válido")
    } else {
        setSuccess(form[2])
        erro = false
    }
    if (event.type == 'submit') {
        if (!erro) return false
    }
}

function vaildaAno(event) {
    let erro = true 

    const data = new Date()
    if (form[3].value.length == 0) {
        setError(form[3], "Campos de data Obrigatório")
    } else if (!isNumber(form[3].value)) {
        setError(form[3], "Digite apenas números nas datas")
    } else if (form[3].value > data.getFullYear()) {
        setError(form[3], "Digite um ano válido")
    } else {
        setSuccess(form[3])
        erro = false
    }

    if (event.type == 'submit') {
        if (!erro) return false
    }
}

function vaildaCVC(event) {
    let erro = true 

    if (form[4].value.length == 0) {
        setError(form[4], "Campos Obrigatório")
    } else if (form[4].value < 100) {
        setError(form[4], "Digite um cvc com 3 digitos")
    } else if (!isNumber(form[4].value)){
        setError(form[4], "Digite um cvc válido")
    } else {
        setSuccess(form[4])
        erro = false
    }

    if (event.type == 'submit') {
        if (!erro) return false
    }
}

// verificar se está no formato desejado
function isName(nome) {
    return /^((?!.*\d)(?!.*[);(@{}!#$%¨&*|\\°^~?])[a-zA-Zà-úÀ-Ú]{2,} ?)+$/.test(nome)
}
function isCardNumber(numeros) {
    return /^(\d{4} ){3}\d{4}$/.test(numeros)
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Mostrar / tirar mensagem de erro dos inputs
function getSpan(campo) {
    return campo.parentNode.querySelector('span.error')
}

function setError(campo, mensage) {
    const spanError = getSpan(campo)
    
    campo.classList.add('error')
    spanError.style.display = "block"
    spanError.innerHTML = mensage
}

function setSuccess(campo) {
    const spanError = getSpan(campo)
    
    campo.classList.remove('error')
    spanError.style.display = "none"
    spanError.innerHTML = ""
}

function testInputsValues(event) {
    return [validaNome(event), validaCardNumber(event), vaildaMes(event), vaildaAno(event), vaildaCVC(event)].every(value => value == false)
}

function validaForm(event) {
    event.preventDefault()
    
    const completeForm = testInputsValues(event)

    if (completeForm) {
        enterValuesInTheCards()
        TrocaForm()
    }
}

// Fim do formulário
function enterValuesInTheCards() {
    cardNumber.innerHTML = form[1].value
    cardName.innerHTML = form[0].value
    cardDate.innerHTML = `${formataMes(form[2].value)}/${formataAno(form[3].value)}`
    cardCVC.innerHTML = form[4].value
}

function TrocaForm() {
    sectForm.style.display = "none"
    sectComplete.style.display = "flex"

    continue_btn.addEventListener('click', restartForm)
}

// por no formato desejado
function formataMes(mes) {
    if (mes < 10) {
        return `0${mes}`
    } else {
        return mes
    }
}

function formataAno(ano) {
    if (ano < 10) {
        return `0${ano}`
    } else if(ano < 100) {
        return ano
    } else if (ano < 1000) {
        return ano.substring(1,)
    } else {
        return ano.substring(2,)
    }
}

function restartForm() {
    sectForm.style.display = "block"
    sectComplete.style.display = "none"
    clearCardValues()
    clearInputsValues()

    continue_btn.removeEventListener('click', restartForm)
}

function clearInputsValues() {
    for (const input of form) {
        if (input.type != 'submit') {
            input.value = ""
        }
    }
}

function clearCardValues () {
    cardNumber.innerHTML = "0000 0000 0000 0000"
    cardName.innerHTML = "..."
    cardDate.innerHTML = "00/00"
    cardCVC.innerHTML = "000"
}

form.addEventListener('submit', validaForm)

form[0].addEventListener('blur', validaNome)

form[1].addEventListener('blur', validaCardNumber)

form[2].addEventListener('blur', vaildaMes)

form[3].addEventListener('blur', vaildaAno)

form[4].addEventListener('blur', vaildaCVC)
