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

const userRepository = new ModelRepository('users');
const productsRepository = new ModelRepository('products');
const shoppingListsRepository = new ModelRepository('shopping-lists');

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
    }

    /**
     * Sign up a new user
     * @param {*} parameters 
     * @returns {User} new user 
     */
    signup(parameters) {
        const users = userRepository.get({});
        const user = users.find(user => user.email === email);
        if (user) {
            throw "Email already exist";
        }
        const newUser = new User(parameters.name, parameters.email, parameters.password);
        userRepository.add(newUser);
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
        const users = userRepository.get({});
        const currentUser = users.find(user => user.email === parameters.email);
        if (!currentUser) {
            throw "User not found";
        }
        if (currentUser.password !== parameters.password) {
            throw "Wrong password";
        }

        const products = productsRepository.get({});
        const shoppingLists = shoppingListsRepository.get({});

        currentUser.shoppingLists = shoppingLists.filter(list => list.userId === currentUser.id);
        currentUser.shoppingLists.forEach(list => {
            list.products = products.filter(product => product.listId === list.id);
        });

        return currentUser;
    }
}




