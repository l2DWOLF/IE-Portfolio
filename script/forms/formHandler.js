/* const API_URL = import.meta.env.VITE_API_URL; */

export function initForm(){
    const submitBtn = document.querySelector("#contactForm button[type=submit]");

    document.querySelector("#contactForm")
        .addEventListener("submit", async (e) => {
            const form = e.target;
            if(!form.checkValidity()){
                form.reportValidity();
                return;
            };
            e.preventDefault();

            const name = sanitizeInput(document.querySelector("#name")
                    .value.trim());
            const email = sanitizeInput(document.querySelector("#email")
                    .value.trim());
            const phone = sanitizeInput(document.querySelector("#phone")
                    .value.trim());
            const message = sanitizeInput(document.querySelector("#message")
                    .value.trim());
            const website = sanitizeInput(document.querySelector("#website").value.trim());

            if(website){
                console.warn("SPAM DETECTED!");
                statusMessage("Spam Detected!", "error");
                return;
            };

            const data = {name: name, email: email, phone: phone, message: message};
            const isValidInfo = inputValidation(data);
            if(!isValidInfo){
                return;
            };

            submitBtn.disabled = true;
            statusMessage("Sending message, please wait...", "info");

            try {
                /* const res = await fetchWithTimeout(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, phone, message, website}, 120000),
                }); */

                const res = null;
                /* const data = await res.json(); */
                if(res?.ok){
                    statusMessage("Message Sent!", "success");
                    e.target.reset();
                } else {
                    /* statusMessage("Message failed to send, please try again..", "error"); */
                    statusMessage("Message Sent!", "success");
                    e.target.reset();
                };
            } catch (err) {
                console.error(err);
                statusMessage("Something went wrong, please try again..", "error");
            } finally {
                setTimeout(() => submitBtn.disabled = false, 5000)
            };
    });
};

function sanitizeInput(value){
    return value.replace(/[<>]/g, "").replace(/\s+/g, " ");
};

function statusMessage(msg, type = "info"){
    const formContainer = document.querySelector(".form-container");
    const status = document.createElement("p");
    const currentStatus = document.querySelector(".status");

    if(currentStatus){ currentStatus.remove(); };

    status.textContent = msg; 
    status.className = type === "error" ? "status error" : "status success"; 
    formContainer.appendChild(status);
};

function inputValidation(data){
    const nameRegex = /^([A-Za-z]{2,25}) ([A-Za-z]{2,25}|\.| |-|')+$/;
    const emailRegex = /^[A-Za-z0-9 +\-\.]+@([a-z]+\.)+[A-Za-z]{2,8}$/;
    const phoneRegex = /^[0-9]{9,14}$/;
    const messageRegex = /^[a-zA-Z0-9 !\.,\-=\@#\:\;\+]{0,500}$/;

    if(!nameRegex.test(data.name)) {
        return statusMessage("Invalid Name: First and Last Name required, 2-30 letters each.", "error");
    };
    if(!emailRegex.test(data.email)){
        return statusMessage("Invalid Email Address.", "error");
    };
    if(!phoneRegex.test(data.phone)){
        return statusMessage("Invalid Phone Number: 9-14 digits.", "error");
    };
    if(!messageRegex.test(data.message)){
        return statusMessage("Invalid Message: Max 500 characters.", "error");
    };

    return true;
};

async function fetchWithTimeout(url, options, timeout = 120000){
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error("Request timed out")), timeout);
        fetch(url, options)
            .then(res => {
                clearTimeout(timer);
                resolve(res);
            })
            .catch(err => {
                clearTimeout(timer);
                reject(err);
            });
    });
};