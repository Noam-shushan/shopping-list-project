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
        let username = user.split('%')[0]
        let password =  user.split('%')[1]
        let newUser = new User(username,'',password)

        saveData('users', newUser);
    }
}



