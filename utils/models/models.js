
/**
 * This is the model for the user.
 */
export class User {
    /**
     * Creates a new user.
     * @param {string} name name of the user.
     * @param {string} email email of the user.
     * @param {string} password password of the user.
     */
    constructor(name, email, password) {
        /**
         * the id of the user.
         * @type {string}
         */
        this.id = '';
        /**
         * the name of the user.
         * @type {string}
         */
        this.name = name;
        /**
         * the email of the user.
         * @type {string}
         */
        this.email = email;
        /**
         * the password of the user.
         * @type {string}
         */
        this.password = password;
        /**
         * the shopping lists of the user.
         * @type {ShoppingList[]}
         */
        this.shoppingLists = [];
    }
}

export class ShoppingList {
    constructor(name, products) {
        this.id = '';
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

export class Product {
    constructor(name, category, amount) {
        this.id = '';
        this.listId = '';
        this.name = name;
        this.category = category;
        this.amount = amount;
    }
}