const form = document.querySelector(".form");
const userName = form.querySelector("#name");
const userPhone = form.querySelector("#phone");
const userEmail = form.querySelector("#email");
const errorName = form.querySelector(".name-error");
const errorPhone = form.querySelector(".phone-error");
const errorEmail = form.querySelector(".email-error");
const token = "5748356313:AAGtYnk4zpGZUzahRTAFLES_sPRYJqaXENw"
const admin = 5189048174

const validateForm = function () {
    const userNameValue = userName.value;
    const userPhoneValue = userPhone.value;
    const userEmailValue = userEmail.value;

    const regaxPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{7}$/g;
    const EmailRegas = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    const errors = {
        nameError: '',
        phoneError: '',
        emailError: '',
    }

    if (userNameValue) {
        errors.nameError = ''
        errorName.textContent = errors.nameError
    } else {
        errors.nameError = 'You shuold fill name field'
        errorName.textContent = errors.nameError
    }

    if (userPhoneValue.match(regaxPhone)) {
        errors.phoneError = ''
        errorPhone.textContent = errors.phoneError
    } else {
        errors.phoneError = 'Phone number is incorrect'
        errorPhone.textContent = errors.phoneError
    }

    if (userEmailValue.match(EmailRegas)) {
        errors.emailError = ''
        errorEmail.textContent = errors.emailError
    } else {
        errors.emailError = 'Email is incorrect'
        errorEmail.textContent = errors.emailError
    }

    const bool = Object.values(errors).every(elem => !elem) ? true : false

    if (bool) {
        const messege = `User Info: %0A <strong> 👤 User name: </strong> ${userNameValue} %0A <strong> 📞 User phone: </strong> ${userPhoneValue} %0A <strong> 📧 User Email: </strong> ${userEmailValue}`
        return messege
    }
    else {
        return false
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const messege = validateForm()

    if (messege) {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${admin}&text=${messege}&parse_mode=html`)

        userName.value = ''
        userPhone.value = ''
        userEmail.value = ''
    }
})