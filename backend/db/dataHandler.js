
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
        if (redordId in collection) { // Update record
            localStorage.setItem(fullId, JSON.stringify(data));
        }
    }
    else {
        const newID = crypto.randomUUID();
        collection.push(newID);
        localStorage.setItem(collectionName, JSON.stringify(collection));
        localStorage.setItem(`${collectionName}/${newID}`, JSON.stringify(data));
    }
}

function getCollection(collectionName) {
    if (localStorage.getItem(collectionName) === null) {
        localStorage.setItem(collectionName, JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem(collectionName));
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
        return localStorage.getItem(fullId);
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
