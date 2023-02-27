import { ModelRepository } from "./ModelRepository.js";

/**
 * Users Repository
 */
export class UsersRepository extends ModelRepository {
    constructor() {
        super('users');
        this.route["GET/:id"] = this.getFullUser;
        this.productsRepository = new ModelRepository('products');
        this.shoppingListsRepository = new ModelRepository('shopping-lists');
    }

    getFullUser(userId) {
        const user = this.get({ id: userId.id });
        const products = this.productsRepository.get({});
        const shoppingLists = this.shoppingListsRepository.get({});

        user.shoppingLists = shoppingLists.filter(list => list.userId === user.id);
        user.shoppingLists.forEach(list => {
            list.products = products.filter(product => product.listId === list.id);
        });

        return user;
    }
}