import { saveData, loadData } from "../db/dataHandler.js";

export class Product {
    constructor(name, in_cart) {
        this.name = name;
        this.in_cart = in_cart;
    }
}

export class ProductStore {
    constructor() {
        this.route = {
            "GET": this.getAllProducts,
            "POST": this.addProduct,
            "PUT": this.updateProduct,
            "DELETE": this.deleteProduct
        }
    }

    getAllProducts() {
        return loadData('products');
    }

    getProduct(id) {
        return loadData(id);
    }

    addProduct(product) {
        saveData('product', product);
    }
}



