// 📑 REGISTRATION FORM ELEMENTS & INPUT ANCHOR BINDINGS
const name = document.getElementById("name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const category = document.getElementById("category");
const urgency = document.getElementById("urgency");
const message = document.getElementById("message");
const submit = document.getElementById("submitbtn");

// 🔍 REGEX VALIDATION LOGIC RULES
// 1. Name: Must contain letters only, spaces allowed, at least 3 characters long
const nameRegex = /^[a-zA-Z\s]{3,}$/;

// 2. Email: Verifies standard characters followed by '@' pattern format structures
const emailRegex = /^[a-zA-Z0-9+-._]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,50}$/;

// 3. Phone: Must contain exactly 10 numerical digits
const phoneRegex = /^[0-9]{10}$/;

// 4. Message: Accepts letters, numbers, and core punctuation characters, bounded between 10 and 100 characters
const msgRegex = /^[a-zA-Z0-9\s\.,!?'\n-]{10,100}$/;

// Timer identifier used to throttle error logs so they don't block typing speed
let delayTimer;

// ⚙️ SYSTEM FORM VALIDATION PROCESSING ENGINE ROUTINE
const validateForm = () => {

    // Evaluate input box value variables against logic pattern filters
    const isNameValid = nameRegex.test(name.value);
    const isEmailValid = emailRegex.test(email.value);
    const isPhoneValid = phoneRegex.test(phoneNumber.value);
    const isMsgValid = msgRegex.test(message.value);
    const isCategoryValid = category.value !== "";
    const isUrgencyValid = urgency.value !== "";

    // Lock/Unlock submit button trigger based on all conditions evaluating to true
    submit.disabled = !(isNameValid && isEmailValid && isPhoneValid && isMsgValid && isCategoryValid && isUrgencyValid);

    // Clear previous timing frames to restart our user typing delay scan
    clearTimeout(delayTimer);

    // DELAY ERROR RENDERING (Debounce Rule)
    // Waits for 1 full second after typing stops before flashing warnings on the interface screen
    delayTimer = setTimeout(() => {
        
        // Name error visualization toggle rule
        if (!isNameValid && name.value.length > 0) {
            document.getElementById("nameError").style.display = "block";
        } else {
            document.getElementById("nameError").style.display = "none";
        }

        // Email error visualization toggle rule
        if (!isEmailValid && email.value.length > 0) {
            document.getElementById("emailError").style.display = "block";
        } else {
            document.getElementById("emailError").style.display = "none";
        }

        // Phone number error visualization toggle rule
        if (!isPhoneValid && phoneNumber.value.length > 0) {
            document.getElementById("phoneError").style.display = "block";
        } else {
            document.getElementById("phoneError").style.display = "none";
        }

        // Message context error visualization toggle rule
        if (!isMsgValid && message.value.length > 0) {
            document.getElementById("messageError").style.display = "block";
        } else {
            document.getElementById("messageError").style.display = "none";
        }

    }, 1000); // 1000 milliseconds delay window
};

/* SUBMIT BUTTON EVENT CLICK EVENT LISTENER HANDLER */
submit.addEventListener("click", (event) => {
    event.preventDefault(); // Block native default postback redirections
    alert("Form submitted successfully");

    // Clear values inside input text fields
    name.value = "";
    email.value = "";
    phoneNumber.value = "";
    message.value = "";
    category.value = "";
    urgency.value = "";
    
    validateForm(); // Reset and lock form validation state triggers
});

// Form field input tracking attachments to auto-calculate completeness
name.addEventListener("input", validateForm);
email.addEventListener("input", validateForm);
phoneNumber.addEventListener("input", validateForm);
message.addEventListener("input", validateForm);
category.addEventListener("change", validateForm);
urgency.addEventListener("change", validateForm);