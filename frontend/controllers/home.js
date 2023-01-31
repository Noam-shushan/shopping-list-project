import { LoadButton } from '../components/LoadButton.js';

const shoppingList = document.querySelector('shopping-list');
shoppingList.addEventListener('onNewItem', (event) => {
    console.log(`item: ${JSON.stringify(event.detail)} added`);
});
shoppingList.addEventListener('onDelete', (event) => {
    console.log(`item: ${JSON.stringify(event.detail)} removed from '${shoppingList.listName}'`);
});

const loadBtn = document.getElementById('loadBtn');
const loadBtnComponent = new LoadButton(loadBtn);
const alert = document.getElementById('alert');
alert.addEventListener('click', () => {
    console.log('alert');
});