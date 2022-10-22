import "./css/index.css"
import IMask from "imask"

const ccBgColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

//################# BANDEIRA DO CARTÂO  #######################################

function setCardType(type) {

    const colors = {
        visa: [
            "#436D99", "#2D57F2"
        ],
        mastercard: [
            "#DF6F29", "#C69347"
        ],
        rocketseat: [
            "#3399FF", "#990099"
        ],
        default: [
            "black", "gray"
        ]
    }

    ccBgColor1.setAttribute("fill", colors[type][0])
    ccBgColor2.setAttribute("fill", colors[type][1])
    ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

//################# NÚMERO DO CARTÂO  #######################################

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardtype: "visa"
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "mastercard"
        },
        {
            mask: "0000 0000 0000 0000",
            cardtype: "default"
        }
    ],
    dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "")
        const foundMask = dynamicMasked.compiledMasks.find(function (item) {
            return number.match(item.regex)
        })
        return foundMask
    }
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

cardNumberMasked.on("accept", () => {
    const cardType = cardNumberMasked.masked.currentMask.cardtype
    setCardType(cardType)
    updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
    const ccNumber = document.querySelector(".cc-number")
    ccNumber.innerText = number.length === 0 ? "0000 0000 0000 0000" : number
}

//################# NOME DO TITULAR #######################################

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
    const ccHolder = document.querySelector(".cc-holder .value")
    ccHolder.innerText = cardHolder.value.length === 0 ? "INSIRA O NOME" : cardHolder.value
})

//################# VALIDADE DO CARTÂO  #######################################

const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2)
        }
    }
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

expirationDateMasked.on("accept", () => {
    updateExpirationDate(expirationDateMasked.value)
  })
  
  function updateExpirationDate(date) {
    const ccExpirationDate = document.querySelector(".cc-extra .value")
    ccExpirationDate.innerText = date.length === 0 ? "02/32" : date
  }


//################# CVC DO CARTÂO  #######################################

const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
    mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

securityCodeMasked.on("accept", () => {
    updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
    const ccSecurity = document.querySelector(".cc-security .value")
    ccSecurity.innerText = code.length === 0 ? "XXX" : code
}

//################# ADICIONAR CARTÂO  #######################################

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
    const addButton = document.querySelector("#add-card")
    addButton.addEventListener("click", () => {
        handleInputs()
    })
})

//############################ VALIDAÇÕES ##################################

function handleInputs() {
    const formInputs = document.querySelectorAll(".input-wrapper input")
    formInputs.forEach(inputValue => {
        if (inputValue.value === "" || undefined) {
            alertError()
        } else {
            alertSuccess()
        }
    })
}

const alertEvent = document.querySelector("#alert")

function alertSuccess() {
    alertEvent.classList.replace("hide", "alert-confirm")
    alertEvent.children[0].textContent = "Cartão Adicionado com Sucesso!"
    alertEvent.classList.replace("alert-error", "alert-confirm")
}

function alertError() {
    alertEvent.classList.replace("hide", "alert-error")
    alertEvent.children[0].textContent = "Preencha os dados corretamente!"
    alertEvent.classList.replace("alert-confirm", "alert-error")
}

















