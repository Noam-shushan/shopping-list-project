
/**
 * Get a collection from local storage
 * @param {string} collectionName Collection name to get from local storage
 * @returns {string[]} an array of record ids in the collection
 */
function getCollection(collectionName) {
    if (localStorage.getItem(collectionName) === null) {
        localStorage.setItem(collectionName, JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem(collectionName));
}

/**
 * Save data to local storage
 * if the fullId is in the format of "collectionName/recordId" then it will update the record
 * if the fullId is in the format of "collectionName" then it will create a new record
 * @param {string} fullId a string in the format of "collectionName/recordId" 
 * @param {object} data the data to save
 */
export function saveData(fullId, data) {
    let splitId = fullId.split('/');
    let collectionName = splitId[0];
    let collection = getCollection(collectionName);
    if (splitId.length === 2) {
        let redordId = splitId[1];
        if (!collection.includes(redordId)) { // in case o insert
            collection.push(redordId);
            localStorage.setItem(collectionName, JSON.stringify(collection));
        }
        localStorage.setItem(fullId, JSON.stringify(data));
    }
}


/**
 * Load data from local storage
 * if the fullId is in the format of "collectionName/recordId" then it will return the record
 * if the fullId is in the format of "collectionName" then it will return all the records in the collection
 * @param {string} fullId a string in the format of "collectionName/recordId"
 * @returns {object} the record or an array of records
 */
export function loadData(fullId) {
    let splitId = fullId.split('/');
    if (splitId.length === 2) {
        return JSON.parse(localStorage.getItem(fullId));
    }
    else if (splitId.length === 1) {
        let collectionName = splitId[0];
        let collection = getCollection(collectionName);
        let data = [];
        for (let i = 0; i < collection.length; i++) {
            const record = localStorage.getItem(`${collectionName}/${collection[i]}`);
            data.push(JSON.parse(record));
        }
        return data;
    }
}

/**
 * Delete a record from local storage
 * @param {string} fullId the full id of the record to delete
 */
export function deleteRecord(fullId) {
    const splitId = fullId.split('/');
    const collectionName = splitId[0];
    const collection = getCollection(collectionName);
    const index = collection.indexOf(splitId[1]);
    if (index > -1) {
        collection.splice(index, 1);
        localStorage.setItem(collectionName, JSON.stringify(collection));
        localStorage.removeItem(fullId);
    }
    else {
        throw 'Record not found';
    }
}

export function generateId() {
    const newID = crypto.randomUUID();
    return newID.replaceAll('/', ''); // to avoid conflict with the id format
}