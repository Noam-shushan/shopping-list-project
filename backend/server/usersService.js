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
        // this.addUser(new User("admin1", "11sdf22", "admin"));
        // this.addUser(new User("admin2", "111afsd2", "admin"));
        // this.addUser(new User("admin3", "111asdf2", "admin"));
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



