console.log(JSON.parse(localStorage.getItem("users")));

const form = document.querySelector("form");

const usernameOrEmail = document.querySelector("input[type='text']");
const password = document.querySelector("input[type='password']");

let usernameOrEmailInput;
let passwordInput;

usernameOrEmail.addEventListener("input", () => {
    usernameOrEmailInput = usernameOrEmail.value;
});

password.addEventListener("input", () => {
    passwordInput = password.value;
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    let user = users.find((user) => {
        if (user.username == usernameOrEmailInput) return user;
        if (user.email == usernameOrEmailInput) return user;
    });
    if (user && user.password == passwordInput) {
        localStorage.setItem("online", user.id);
        window.location.href = "../../contacts.html";
    }
});
