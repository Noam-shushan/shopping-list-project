import { ModelRepository } from "./ModelRepository.js";
import { User } from "../../utils/models/models.js";

const postData = {
    userEmail: "email",
    listId: "listName",
    product: {
        name: "name",
        category: "category",
        amount: 1
    }
}

/**
 * Login and signup
 */
export class LoginSingup {
    constructor() {
        this.route = {
            "GET": this.login,
            "POST": this.signup,
            "PUT": null,
            "DELETE": null,
        }
        this.userRepository = new ModelRepository('users');
        this.productsRepository = new ModelRepository('products');
        this.shoppingListsRepository = new ModelRepository('shopping-lists');
    }

    /**
     * Sign up a new user
     * @param {*} parameters 
     * @returns {User} new user 
     */
    signup(parameters) {
        const user = this.findUserByEmail(parameters.email);
        if (user) {
            throw "Email already exist";
        }
        const newUser = this.userRepository.add(new User(
            parameters.name,
            parameters.email,
            parameters.password)
        );
        return newUser;
    }

    /**
     * @name UserParameters
     * @property {string} email
     * @property {string} password
     */
    /**
     * Login a user
     * @param {UserParameters} parameters 
     * @returns {User} the user with his shopping lists and products  
     */
    login(parameters) {
        const user = this.findUserByEmail(parameters.email);
        if (!user) {
            throw "User not found";
        }
        if (user.password !== parameters.password) {
            throw "Wrong password";
        }

        return this.fullUser(user);
    }

    findUserByEmail(email) {
        const users = this.userRepository.get({});
        const user = users.find(user => user.email === email);
        return user;
    }

    fullUser(user) {
        const products = this.productsRepository.get({});
        const shoppingLists = this.shoppingListsRepository.get({});

        user.shoppingLists = shoppingLists.filter(list => list.userId === user.id);
        user.shoppingLists.forEach(list => {
            list.products = products.filter(product => product.listId === list.id);
        });

        return user;
    }
}




