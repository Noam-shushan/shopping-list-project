import { ShoppingList } from './components/ShoppingList.js';
import { ProductItem } from './components/ProductItem.js';
import { TabControl } from './components/TabControl.js';
import { ListItem } from './components/ListItem.js';
import { Loader } from './components/Loader.js';


document.addEventListener('DOMContentLoaded', () => {
    main();
});

function main() {
    customElements.define('shopping-list', ShoppingList);
    customElements.define('product-item', ProductItem);
    customElements.define('tab-control', TabControl);
    customElements.define('list-item', ListItem);
    customElements.define('my-loader', Loader);
}