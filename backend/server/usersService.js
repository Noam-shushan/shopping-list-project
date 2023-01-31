import { saveData, loadData } from "../db/dataHandler.js";

export class User {
    constructor(name, email, password) {
        /**
         * @type {string}
         */
        this.name = name;
        /**
         * @type {string}
         */
        this.email = email;
        this.password = password;
        /**
         * @type {ShoppingList[]}
         */
        this.shoppingLists = [];
    }
}

const postData = {
    userEmail: "email",
    listName: "listName",
    product: {
        name: "name",
        category: "category",
        amount: "amount"
    }
}
export class ShoppingList {
    constructor(name, products) {
        /**
         * @type {string}
         */
        this.name = name;
        /**
         * @type {Product[]}
         */
        this.products = products;
    }
}

class Product {
    constructor(name, category, amount) {
        this.name = name;
        this.category = category;
        this.amount = amount;
    }
}

export class UserStore {
    constructor() {
        this.route = {
            "GET": this.getAllUsers,
            "POST": this.addUser,
            "PUT": this.updateUser,
            "DELETE": this.deleteUser
        }
    }

    getAllUsers() {
        return loadData('users');
    }

    getUser(id) {
        return loadData(id);
    }

    addUser(user) {
        saveData(`users/${user.email}`, user);
    }
}



