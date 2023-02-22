import { ShoppingList } from './components/ShoppingList.js';
import { ListItem } from './components/ListItem.js';
import { TabControl } from './components/TabControl.js';


document.addEventListener('DOMContentLoaded', () => {
    main();
});

function main() {
    customElements.define('shopping-list', ShoppingList);
    customElements.define('list-item', ListItem);
    customElements.define('tab-control', TabControl);
}