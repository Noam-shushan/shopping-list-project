import * as currentUserHandler from "./CurrentUserHandler.js";
import { ShoppingListsController } from './ShoppingListsController.js';
import { FXMLHttpRequest } from "../fajax/FXMLHttpRequest.js";

document.addEventListener('navigate', (event) => {
    const page = event.detail;
    if (page === 'home') {
        main();
    }
});

document.addEventListener('onreload', () => {
    const currentUser = currentUserHandler.getCurrentUser();
    if (!currentUser) {
        window.location.hash = 'login';
        return;
    }
    else {
        let fajax = new FXMLHttpRequest();
        fajax.open("GET", `/api/users/?id=${currentUser.id}`);
        fajax.send();
        fajax.onload = () => {
            const user = JSON.parse(fajax.responseText);
            currentUserHandler.setCurrentUser(user);
        };
    }
});

function main() {
    const currentUser = currentUserHandler.getCurrentUser();
    if (!currentUser) {
        window.location.hash = 'login';
        return;
    }

    const userName = document.querySelector('#user-name');
    userName.innerHTML += currentUser.name;

    if (currentUser.shoppingLists.length > 0) {
        createShoppingListElemnt();
    }

    const listsContainer = document.querySelector('#lists');

    const shoppingListsController = new ShoppingListsController(listsContainer, currentUser.shoppingLists);
    handleAddNewList(shoppingListsController);

    const logoutBtn = document.querySelector('#logout-btn');
    logoutBtn.addEventListener('click', logout);
}

function createShoppingListElemnt() {
    const soppingList = document.createElement('shopping-list');
    const container = document.querySelector('.right-side');
    container.appendChild(soppingList);
    return soppingList;
}

/**
 * Handle add new list button
 * @param {ShoppingListsController} shoppingListControler 
 */
function handleAddNewList(shoppingListsController) {
    const addListBtn = document.querySelector('#add-list-btn');
    const listNameTextBox = document.querySelector('#list-name');

    addListBtn.addEventListener('click', () => {
        listNameTextBox.style.display = 'block';
        listNameTextBox.focus();
    });

    listNameTextBox.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const listName = listNameTextBox.value;
            shoppingListsController.addNewList(listName);
            listNameTextBox.value = '';
            listNameTextBox.style.display = 'none';
        }
    });

    document.addEventListener('onNewList', (event) => {
        if (shoppingListsController.lists.length === 1) {
            createShoppingListElemnt();
            shoppingListsController.rejesterToEvents();
            shoppingListsController.currentList = shoppingListsController.lists[0];
        }
    });
}

/**
 * Log out user
 */
function logout() {
    currentUserHandler.clearCurrentUser();
    window.location.hash = 'login';
}


