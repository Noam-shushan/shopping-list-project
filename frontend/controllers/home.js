import { LoadButton } from '../components/LoadButton.js';


const loadBtn = document.getElementById('loadBtn');
const loadBtnComponent = new LoadButton(loadBtn);
const alert = document.getElementById('alert');
alert.addEventListener('click', () => {
    console.log('alert');
});