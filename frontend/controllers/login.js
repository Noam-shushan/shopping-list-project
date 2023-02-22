import { User } from "../../utils/models/models.js";
import * as currentUserHandler from "./CurrentUserHandler.js";
import { FXMLHttpRequest } from "../fajax/fajax.js";


function main() {
    // listen to the submit event on the login and signup forms
    document.addEventListener("submit", (event) => {
        event.preventDefault();
        let currentUser = currentUserHandler.getCurrentUser();
        if (currentUser) {
            alert("You are already logged in!");
            return;
        }
        if (event.target.matches("#login")) {
            login();
        } else if (event.target.matches("#signup")) {
            signup();
        }
        // navigate to the home page 
    });
}

main();

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
    fajax.onload = () => {
        userData = JSON.parse(fajax.responseText);
        if (!userData) {
            alert("Username not found, please try again.");
            return;
        }
        console.log(`user logged in: ${userData.email}`);
        currentUserHandler.setCurrentUser(userData);
        alert(`Welcome back ${userData.name}!`);
        clearForm();
        window.location.href = "/";
    };

    fajax.onerror = () => {
        alert(`Error: ${fajax.responseText}, status code: ${fajax.status}`);
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

    let newUser = new User(name, email, password);

    const fajax = new FXMLHttpRequest();
    fajax.open("POST", `/api/login-singup`);
    fajax.send(newUser);
    let userData = {};
    fajax.onload = () => {
        userData = JSON.parse(fajax.responseText);
        console.log(`new user registered: ${email}`);
        currentUserHandler.setCurrentUser(userData);
        alert(`Welcome ${newUser}!`);
        clearForm();
        window.location.href = "/";
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

