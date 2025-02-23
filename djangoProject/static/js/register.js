console.log('register is working');

const usernameField = document.querySelector('#usernameField');
const feedbackArea = document.querySelector('.invalid-feedback');
const passwordField = document.querySelector('#passwordField');
const showPasswordToggle = document.querySelector(".showPasswordToggle");

const handleToggleInput=(e)=>{
    if (showPasswordToggle.textContent === "SHOW") {
        showPasswordToggle.textContent = "HIDE";
        passwordField.setAttribute("type","text");
    } else {
        showPasswordToggle.textContent = "SHOW";
        passwordField.setAttribute("type","password");
    }
}

showPasswordToggle.addEventListener("click", handleToggleInput);

usernameField.addEventListener("keyup", (e) => {
    const usernameVal = e.target.value;
    usernameField.classList.remove("is-invalid");
    feedbackArea.style.display = "none";
    if (usernameVal.length > 0) {
        fetch("/authentication/validate-username/", {
            body: JSON.stringify({username: usernameVal}),
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                if (data.username_error) {
                    usernameField.classList.add("is-invalid");
                    feedbackArea.style.display = "block";
                    feedbackArea.innerHTML = `<p>${data.username_error}</p>`
                }
            });
    }
});


const emailField = document.querySelector('#emailField')
const emailArea = document.querySelector('.invalidEmailArea')
emailField.addEventListener("keyup", (e) => {
    const emailVal = e.target.value;
    emailField.classList.remove("is-invalid");
    emailArea.style.display = "none";

    if (emailVal.length > 0) {
        fetch("/authentication/validate-email/", {
            body: JSON.stringify({email: emailVal}),
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.email_error) {
                    emailField.classList.add("is-invalid");
                    emailArea.style.display = "block";
                    emailArea.innerHTML = `<p>${data.email_error}</p>`
                }
            })
    }
})