import * as db from "../db/dataHandler.js";

export class ModelRepository {
    constructor(collectionName) {
        this.collectionName = collectionName;
        this.route = {
            "GET": this.get,
            "POST": this.add,
            "PUT": this.update,
            "DELETE": this.delete,
        }
    }

    get(parameters) {
        const id = parameters.id;
        const fullId = id ? `${this.collectionName}/${id}` : this.collectionName;
        return db.loadData(fullId);
    }

    add(recoed) {
        if (!recoed && !recoed.id) {
            throw "Invalid record";
        }
        recoed.id = db.generateId();
        db.saveData(`${this.collectionName}/${recoed.id}`, recoed);
    }

    update(recoed) {
        db.saveData(`${this.collectionName}/${recoed.id}`, recoed);
    }

    delete(parameters) {
        const id = parameters.id;
        if (!id) {
            throw "Invalid id";
        }
        db.deleteData(`${this.collectionName}/${id}`);
    }
}