import { User } from "../../utils/models/models.js";
import * as currentUserHandler from "./CurrentUserHandler.js";
import { FXMLHttpRequest } from "../fajax/FXMLHttpRequest.js";

document.addEventListener('navigate', (event) => {
    const page = event.detail;
    if (page === 'login') {
        main();
    }
});


function main() {
    const currentUser = currentUserHandler.getCurrentUser();
    if (currentUser) {
        alert("You are already logged in!");
        window.location.hash = "home";
        return;
    }

    const loginBtn = document.querySelector('#login-btn');
    const signupBtn = document.querySelector('#signup-btn');

    loginBtn.addEventListener('click', () => {
        login();
        loginBtn.style.display = "none";
    });

    signupBtn.addEventListener('click', () => {
        signup();
        signupBtn.style.display = "none";
    });
}

/**
 * Login function 
 */
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const fajax = new FXMLHttpRequest();
    fajax.open("GET", `/api/login-singup?email=${email}&password=${password}`);
    fajax.send();
    let userData = {};

    const loader = document.querySelector('my-loader');
    loader.loading = true;

    fajax.onload = () => {
        userData = JSON.parse(fajax.responseText);
        if (!userData) {
            alert("Username not found, please try again.");
            return;
        }
        loader.loading = false;
        console.log(`user logged in: ${userData.email}`);
        currentUserHandler.setCurrentUser(userData);
        const userMessge = document.querySelector('#user-message');
        userMessge.innerText = `Welcome back ${userData.name}!`;
        clearForm();
        window.location.hash = "home";
    };

    fajax.onerror = () => {
        const userMessge = document.querySelector('#user-message');
        userMessge.innerText = `Error: ${fajax.responseText}, status code: ${fajax.status}`;

        clearForm();
    };
}

/**
 * Signup function
 */
function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const name = document.getElementById("signup-name").value;

    if (confirmPassword !== password) {
        alert("Passwords do not match, please try again.");
        return;
    }

    document.querySelector('my-loader').loading = true;

    let newUser = new User(name, email, password);

    const fajax = new FXMLHttpRequest();
    fajax.open("POST", `/api/login-singup`);
    fajax.send(newUser);
    let userData = {};
    fajax.onload = () => {
        userData = JSON.parse(fajax.responseText);
        console.log(`new user registered: ${userData.email}`);
        currentUserHandler.setCurrentUser(userData);
        alert(`Welcome! ${userData.name}`);
        clearForm();
        window.location.hash = "home";
    };

    fajax.onerror = () => {
        alert(`Error: ${fajax.responseText}, status code: ${fajax.status}`);
        clearForm();
    };
}

function clearForm() {
    document.getElementById("signup-email").value = "";
    document.getElementById("signup-password").value = "";
    document.getElementById("signup-name").value = "";
    document.getElementById("confirm-password").value = "";
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
}