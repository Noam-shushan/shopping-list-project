
/**
 * 
 * @param {string} id 
 * @param {object} data
 */
export function saveData(id, data) {
    let collectionName = id.split('/')[0];
    let redordId = id.split('/')[1];

    if (localStorage.getItem(collectionName) === null) {
        localStorage.setItem(collectionName, JSON.stringify([]));
    }

    let entetisId = JSON.parse(localStorage.getItem(collectionName));
    if (redordId in entetisId) {
        localStorage.setItem(id, JSON.stringify(data));
    }
    else {
        const newID = crypto.randomUUID();
        entetisId.push(newID);
        localStorage.setItem(collectionName, JSON.stringify(entetisId));
        localStorage.setItem(`${collectionName}/${newID}`, JSON.stringify(data));
    }
}


/**
 * TODO:
 * @param {string} id
 */
export function loadData(id) {
    let splitId = id.split('/');
    if (splitId.length === 2) {
        return localStorage.getItem(id);
    }
    else if (splitId.length === 1) {
        let collectionName = splitId[0];
        let entetisId = JSON.parse(localStorage.getItem(collectionName));
        let data = [];
        for (let i = 0; i < entetisId.length; i++) {
            const record = localStorage.getItem(`${collectionName}/${entetisId[i]}`);
            data.push(JSON.parse(record));
        }
        return data;
    }
}
