import { saveData, loadData } from "../db/dataHandler.js";

export class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export class UserStore {
    getAllUsers() {
        return JSON.stringify(loadData('users'));
    }

    getUser(id) {
        return JSON.stringify(loadData(id));
    }

    addUser(user) {
        saveData('users', user);
    }
}



