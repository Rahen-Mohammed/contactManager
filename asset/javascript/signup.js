const form = document.querySelector("form");

const username = document.querySelector("input[name='username']");
const email = document.querySelector("input[name='email']");
const password = document.querySelector("input[name='password']");

let usernameInput;
let emailInput;
let passwordInput;

if (!localStorage.getItem("users")) {
    const empty = [];
    localStorage.setItem("users", JSON.stringify(empty));
}

username.addEventListener("input", () => {
    usernameInput = username.value;
});

email.addEventListener("input", () => {
    emailInput = email.value;
});

password.addEventListener("input", () => {
    passwordInput = password.value;
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let usersJson = localStorage.getItem("users");
    let users = JSON.parse(usersJson);

    usernameInput = usernameInput.trim();

    let id_length = users.length;

    let data = {
        id: id_length,
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
    };

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "../../index.html";
});
