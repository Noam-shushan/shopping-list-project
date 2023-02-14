import { LoadButton } from '../components/LoadButton.js';
import { LoginButton } from '../components/loginBtn.js';
import { SignUpButton } from '../components/signup.js'


const loadBtn = document.getElementById('loadBtn');
const loadBtnComponent = new LoadButton(loadBtn);
const alert = document.getElementById('alert');
alert.addEventListener('click', () => {
    console.log('alert');
});

const loginBtn = document.getElementById('loginBtn');
const loginBtnComponent = new LoginButton(loginBtn);

const SignUpBtn = document.getElementById('signUpBtn')
const SignUpBtnComponent = new SignUpButton(SignUpBtn)

