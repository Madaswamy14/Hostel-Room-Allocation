const name = document.getElementById("name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const category = document.getElementById("category");
const urgency = document.getElementById("urgency");
const message = document.getElementById("message");
const submit = document.getElementById("submitbtn");


const nameRegex = /^[a-zA-Z\s]{3,}$/;
const emailRegex = /^[a-zA-Z0-9+-._]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,50}$/;
const phoneRegex = /^[0-9]{10}$/;
const msgRegex = /^[a-zA-Z0-9\s\.,!?'\n-]{10,100}$/;

let delayTimer;

const validateForm = () =>{

    const isNameValid = nameRegex.test(name.value);
    const isEmailValid = emailRegex.test(email.value);
    const isPhoneValid = phoneRegex.test(phoneNumber.value);
    const isMsgValid = msgRegex.test(message.value);
    const isCategoryValid = category.value !== "";
    const isUrgencyValid = urgency.value !== "";

    submit.disabled = !(isNameValid && isEmailValid && isPhoneValid && isMsgValid && isCategoryValid && isUrgencyValid);

    clearTimeout(delayTimer);

    delayTimer = setTimeout(() =>{
        if (!isNameValid && name.value.length > 0){
            document.getElementById("nameError").style.display = "block";
        } else {
            document.getElementById("nameError").style.display = "none";
        }

        if (!isEmailValid && email.value.length > 0){
            document.getElementById("emailError").style.display = "block"
        } else {
            document.getElementById("emailError").style.display = "none"
        }

        if (!isPhoneValid && phoneNumber.value.length > 0){
            document.getElementById("phoneError").style.display = "block"
        } else {
            document.getElementById("phoneError").style.display = "none"
        }

        if (!isMsgValid && message.value.length > 0){
            document.getElementById("messageError").style.display = "block"
        } else {
            document.getElementById("messageError").style.display = "none"
        }

    }, 1000);
};

submit.addEventListener("click",(event) =>{
    event.preventDefault();
    alert("Form submitted successfully");

    // Optional form clean reset
    name.value = "";
    email.value = "";
    phoneNumber.value = "";
    message.value = "";
    category.value = "";
    urgency.value = "";
    validateForm(); 
});

name.addEventListener("input",validateForm);
email.addEventListener("input", validateForm);
phoneNumber.addEventListener("input",validateForm);
message.addEventListener("input",validateForm);
category.addEventListener("change", validateForm);
urgency.addEventListener("change", validateForm);
