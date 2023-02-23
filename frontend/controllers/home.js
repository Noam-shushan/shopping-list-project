import { FXMLHttpRequest } from '../fajax/fajax.js';
import * as currentUserHandler from "./CurrentUserHandler.js";
import { ShoppingList, Product } from '../../utils/models/models.js';
import { ShoppingListControler } from './ShoppingListControler.js';



document.addEventListener('DOMContentLoaded', () => {
    main();
});

function main() {
    const listsContainer = document.querySelector('#lists');
    const lists = [
        new ShoppingList('Lista 1', [
            new Product('Pera', 'blabla', 2),
            new Product('Manzana', 'blabla', 2),
            new Product('Naranja', 'blabla', 3),
        ]),
        new ShoppingList('Lista 2', [
            new Product('Milk', 'blabla', 2),
            new Product('Bread', 'blabla', 2),
            new Product('Eggs', 'blabla', 3),
        ])
    ];
    const shoppingListControler = new ShoppingListControler(listsContainer, lists);
    handleAddNewList(shoppingListControler);
}

function handleAddNewList(shoppingListControler) {
    const addListBtn = document.querySelector('#add-list-btn');
    const listNameTextBox = document.querySelector('#list-name');

    addListBtn.addEventListener('click', () => {
        listNameTextBox.style.display = 'block';
        listNameTextBox.focus();
    });

    listNameTextBox.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const listName = listNameTextBox.value;
            shoppingListControler.addNewListToDom(listName, true);
            listNameTextBox.value = '';
            listNameTextBox.style.display = 'none';
        }
    });
}


