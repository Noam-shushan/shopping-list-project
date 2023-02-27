import { FXMLHttpRequest } from '../fajax/FXMLHttpRequest.js';


/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {ShoppingList[]} shoppingLists
 * @property {string} id
 */

/**
 * Get the current user from the session storage
 * @returns {User} the current user
 */
export function getCurrentUser() {
    let user = sessionStorage.getItem("currentUser");
    if (user && user !== '{}') {
        return JSON.parse(user);
    }
    return null;
}

/**
 * Set the current user in the session storage
 * @param {User} user the user to set as current user 
 */
export function setCurrentUser(user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
}

/**
 * Clear the current user from the session storage
 */
export function clearCurrentUser() {
    sessionStorage.removeItem("currentUser");
    window.location.hash = "login";
}

function updateCurrentUser() {
    const user = getCurrentUser();
    const fajax = new FXMLHttpRequest();
    fajax.open("GET/:id", `/api/users?id=${user.id}`);
    fajax.send();
    fajax.onload = () => {
        const updatedUser = JSON.parse(fajax.responseText);
        setCurrentUser(updatedUser);
    };
}

document.addEventListener('currentUserNeedUpdate', (event) => {
    updateCurrentUser();
});

