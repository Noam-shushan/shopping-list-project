import { FXMLHttpRequest } from '../fajax/fajax.js';
import * as currentUserHandler from "./CurrentUserHandler.js";
import { ShoppingList, Product } from '../../utils/models/models.js';

export class ShoppingListControler {
    constructor(listsContainer, lists) {
        /**
         * @type {ShoppingList[]}
         */
        this.lists = lists;
        /**
         * lists container <div>
         * @type {HTMLElement}
         */
        this.listsContainer = listsContainer;

        this.currnetList = this.lists[0] || null;

        this.setSoppingList();
        this.lists.forEach(list => {
            this.addNewListToDom(list.name);
        });
    }

    addNewListToDom(listName, isnew = false) {
        if (isnew) {
            if (this.lists.find(list => list.name === listName)) {
                alert('list already exists');
                return;
            }
        }
        const list = document.createElement('list-item');
        list.listName = listName;
        this.listsContainer.appendChild(list);
        list.addEventListener('onDelete', (event) => {
            console.log(`list: ${JSON.stringify(event.detail)} deleted'`);
            this.lists = this.lists.filter(list => list.name !== event.detail);
        });
        list.addEventListener('click', () => {
            this.setSoppingList(list.listName);
        });
        if (isnew) {
            this.newList(listName);
        }
    }

    setSoppingList(listName = '') {
        const list = !listName ? this.lists[0] : this.lists.find(list => list.name === listName);
        const soppingList = document.querySelector('shopping-list');
        soppingList.listName = list.listName;
        soppingList.setProducts(list.products);
        soppingList.addEventListener('onNewItem', (event) => {
            const product = event.detail;
            this.newProduct(product);
        });
    }

    newProduct(product) {
        const request = new FXMLHttpRequest();
        request.open('POST', '/api/products');
        request.send(product);
        request.onload = () => {
            console.log(request.responseText);
            product = JSON.parse(request.responseText);
            this.addProduct(product);
        };
    }

    newList(listName) {
        const request = new FXMLHttpRequest();
        request.open('POST', '/api/shopping-lists');
        request.send(new ShoppingList(listName, []));
        request.onload = () => {
            console.log(request.responseText);
            const theNewList = JSON.parse(request.responseText);
            this.lists.push(theNewList);
        };
    }
}