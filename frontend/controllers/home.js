import { FXMLHttpRequest } from '../fajax/fajax.js';
import * as currentUserHandler from "./CurrentUserHandler.js";

function main() {
    const currentUser = currentUserHandler.getCurrentUser();
    if (!currentUser) {
        window.location.hash = "login";
        return;
    }
    const shoppingList = document.querySelector('shopping-list');
    shoppingList.addEventListener('onNewItem', (event) => {
        const newProduct = event.detail;
        console.log(`item: ${JSON.stringify(newProduct)} added`);
        const fajax = new FXMLHttpRequest();

        fajax.open("POST", "/api/shopping-lists");
        fajax.send(newProduct);

    });
    shoppingList.addEventListener('onDelete', (event) => {
        console.log(`item: ${JSON.stringify(event.detail)} removed from '${shoppingList.listName}'`);
    });
}

main();

