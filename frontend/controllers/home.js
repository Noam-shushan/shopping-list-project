import * as currentUserHandler from "./CurrentUserHandler.js";
import { ShoppingListsController } from './ShoppingListsController.js';

document.addEventListener('navigate', (event) => {
    const page = event.detail;
    if (page === 'home') {
        main();
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
        createShoppingListElement();
    }

    const listsContainer = document.querySelector('#lists');

    const shoppingListsController = new ShoppingListsController(listsContainer, currentUser.shoppingLists);
    handleAddNewList(shoppingListsController);

    const logoutBtn = document.querySelector('#logout-btn');
    logoutBtn.addEventListener('click', logout);
}

function createShoppingListElement() {
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
            createShoppingListElement();
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


