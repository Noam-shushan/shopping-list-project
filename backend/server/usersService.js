import { saveData, loadData } from "../db/dataHandler.js";

export class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export class UserStore {
    constructor() {
        this.route = {
            "GET": this.getAllUsers,
            "POST": this.addUser,
            // "PUT": this.updateUser,
            // "DELETE": this.deleteUser
        }
    }

    getAllUsers() {
        return loadData('users');
    }

    getUser(id) {
        return loadData(id);
    }

    addUser(user) {
        saveData('users', user);
    }
}



