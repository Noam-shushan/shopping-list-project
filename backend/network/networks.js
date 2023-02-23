import { Server } from "../server/Server.js";


/**
 * send async the request to the server
 * @param {string} req the request 
 * @returns {string} response
 */
export function sendAsync(req, callback) {
    setTimeout(() => {
        const server = new Server();
        const res = server.hendleRequest(req);
        callback(res);
    }, 3000)
}

/**
 * send sync the request to the server
 * @param {string} req the request 
 * @returns {string} response
 */
export function send(req) {
    const server = new Server();
    const res = server.hendleRequest(req);
    downloading();
    return res;
}


function delay(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

function downloading(during = 3000) {
    console.log("start downloading ...");
    delay(during);
    console.log("end downloading");
}






