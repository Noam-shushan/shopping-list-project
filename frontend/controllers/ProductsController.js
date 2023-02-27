import { FXMLHttpRequest } from '../fajax/FXMLHttpRequest.js';

export class ProductsController {


    newProduct(product, shoppingListControler) {
        const request = new FXMLHttpRequest();
        request.open('POST', '/api/products');
        request.send(product);
        request.onload = () => {
            console.log(request.responseText);
            const newProduct = JSON.parse(request.responseText);
            shoppingListControler.currentList.products.push(newProduct);
            document.dispatchEvent(new CustomEvent('currentUserNeedUpdate'));
        };
    }

    deleteProduct(product, shoppingListControler) {
        const request = new FXMLHttpRequest();
        request.open('DELETE', `/api/products?id=${product.id}`);
        request.send();
        request.onload = () => {
            console.log(request.responseText);
            shoppingListControler.currentList.products = shoppingListControler
                .currentList
                .products
                .filter(p => p.id !== product.id);
            document.dispatchEvent(new CustomEvent('currentUserNeedUpdate'));
        };
    }

    updateProduct(product) {
        const request = new FXMLHttpRequest();
        request.open('PUT', '/api/products');
        request.send(product);
        request.onload = () => {
            console.log(request.responseText);
            document.dispatchEvent(new CustomEvent('currentUserNeedUpdate'));
        };
    }
}