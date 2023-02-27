import * as db from "../db/dataHandler.js";

/**
 * This is genric class for any type of model to preform CRUD opertions
 */
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

    /**
     * Get all records or one record
     * @param {*} parameters can be empty or have id
     * @returns {Array} all records or one record
     */
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
        return recoed;
    }

    update(recoed) {
        db.saveData(`${this.collectionName}/${recoed.id}`, recoed);
        return recoed;
    }

    delete(parameters) {
        const id = parameters.id;
        if (!id) {
            throw "Invalid id";
        }
        db.deleteRecord(`${this.collectionName}/${id}`);
        return `Record ${this.collectionName}/${id} deleted`;
    }
}