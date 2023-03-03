import { FXMLHttpRequest } from '../fajax/FXMLHttpRequest.js';
import * as currentUserHandler from "./CurrentUserHandler.js";
import { ShoppingList, Product } from '../../utils/models/models.js';
import { ProductsController } from './ProductsController.js';


export class ShoppingListsController {
    constructor(listsContainer, lists) {
        this.productsController = new ProductsController();

        /**
         * @type {ShoppingList[]}
         */
        this.lists = lists;
        /**
         * lists container <div>
         * @type {HTMLElement}
         */
        this.listsContainer = listsContainer;

        /**
         * @type {ShoppingList}
         */
        this._currnetList = this.lists[0] || null;
        if (this._currnetList) {
            this.rejesterToEvents();
            this.setSoppingList();
        }

        this.lists.forEach(list => {
            this.addNewListToDom(list.name);
        });
    }

    rejesterToEvents() {
        const soppingList = document.querySelector('shopping-list');
        soppingList.addEventListener('onNewItem', (event) => {
            const product = event.detail;
            product.listId = this.currentList.id;
            this.productsController.newProduct(product, this);
        });
        soppingList.addEventListener('onDeleteItem', (event) => {
            const product = this.currentList.products.find(p => p.name === event.detail.name);
            this.productsController.deleteProduct(product, this);
            this.setSoppingList();
        });
        soppingList.addEventListener('onAmountChange', (event) => {
            const product = this.currentList.products.find(p => p.name === event.detail.name);
            product.amount = event.detail.amount;
            this.productsController.updateProduct(product);
        });
    }

    get currentList() {
        return this._currnetList;
    }

    set currentList(list) {
        if (!list) {
            return;
        }
        if (this._currnetList && list.name === this._currnetList.name) {
            return;
        }
        this._currnetList = list;
        this.setSoppingList();
    }

    addNewList(listName) {
        if (this.lists.find(list => list.name === listName)) {
            alert('list already exists');
            return;
        }
        this.addNewListToDom(listName);
        this.newList(listName);
    }

    addNewListToDom(listName) {
        const listItem = document.createElement('list-item');
        listItem.listName = listName;
        this.listsContainer.appendChild(listItem);
        listItem.addEventListener('onDelete', (event) => {
            console.log(`list: ${JSON.stringify(event.detail)} deleted'`);
            this.lists = this.lists.filter(list => list.name !== event.detail);

        });
        listItem.addEventListener('click', () => {
            listItem.isSelected = !listItem.isSelected;
            this.currentList = this.lists.find(list => list.name === listName);
        });
    }

    setSoppingList() {
        const soppingList = document.querySelector('shopping-list');
        soppingList.listName = this.currentList.name;
        soppingList.setProducts(this.currentList.products);
    }

    newList(listName) {
        const currentUser = currentUserHandler.getCurrentUser();

        const request = new FXMLHttpRequest();
        request.open('POST', '/api/shopping-lists');
        request.send(new ShoppingList(listName, [], currentUser.id));

        request.onload = () => {
            console.log(request.responseText);
            const theNewList = JSON.parse(request.responseText);

            this.lists.push(theNewList);

            document.dispatchEvent(new CustomEvent('onNewList', { detail: theNewList }));

            this.currentList = theNewList;

            currentUser.shoppingLists.push(theNewList);
            currentUserHandler.setCurrentUser(currentUser);
        };
    }
}