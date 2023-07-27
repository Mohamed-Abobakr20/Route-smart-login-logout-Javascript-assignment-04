let users, userName, userEmail, userPassword, logIn, message, signUp, header;
users = [];
userName = document.getElementById("name");
userEmail = document.getElementById("email");
userPassword = document.getElementById("password");
logIn = document.getElementById("login");
signUp = document.getElementById("signup");
message = document.getElementById("message");
header = document.getElementById("header");
let index;


// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------


checkLocalStorage();
if (header != null) {
    header.innerHTML = `Welcome, ${users[index].name}`;
}


// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------


if (signUp != null) {
    function signupEvent(e) {
        e.preventDefault();
        if (userName.value == "" || userEmail.value == "" || userPassword.value == "") {
            displayMessage("All inputs are required", "text-danger")
        } else if (validEmail(userEmail.value)) {

            const checkEmail = checkSignUp();
            if (checkEmail) {
                displayMessage("You have already an account with this email!", "text-danger");
            } else {
                const user = {
                    name: userName.value,
                    email: userEmail.value,
                    password: userPassword.value
                }
                users.push(user);
                displayMessage("Success", "text-success");
                clearDate();
                updateData();
            }

        } else {
            displayMessage("Your email is not valid. Try again!", "text-danger");
        }
    }


    function checkSignUp() {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == userEmail.value) {
                return true;
            }
        }
        return false;
    }

    function validEmail(email) {
        const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return patternEmail.test(email);
    }

    function clearDate() {
        userName.value = "";
        userEmail.value = "";
        userPassword.value = "";
    }

    function updateData() {
        localStorage.setItem("users", JSON.stringify(users));
    }

}


// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------


if (logIn != null) {
    function loginEvent(e) {
        e.preventDefault();
        if (userEmail.value == "" || userPassword.value == "") {
            displayMessage("All inputs are required", "text-danger")
        } else if (users.length == 0) {
            displayMessage("This account is not found. Sign up, please!", "text-danger")
        } else {
            index = getUser();
            localStorage.setItem("index", JSON.stringify(index));
            if (index != -1) {
                window.open("pages/home.html", "_self");
            }
        }
    }


    function getUser() {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == userEmail.value) {
                if (users[i].password == userPassword.value) {
                    displayMessage("Success", "text-success");
                    return i;
                } else {
                    displayMessage("Your password is not correct!", "text-danger");
                    return -1;
                }
            }
        }

        displayMessage("This account is not found. Sign up, please!", "text-danger")
        return -1;
    }
}



// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------



function checkLocalStorage() {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"));
    }
    if (localStorage.getItem("index")) {
        index = JSON.parse(localStorage.getItem("index"));
    }
}



function displayMessage(text, color) {
    message.innerHTML = text;
    message.classList.remove("text-danger", "text-success");
    message.classList.add(color, "fw-semibold");
}