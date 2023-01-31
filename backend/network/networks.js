import { Server } from "../server/server.js";


/**
 * send the request to the server
 * @param {*} req 
 * @returns 
 */
export function sendAsync(req, callback) {
    setTimeout(() => {
        const server = new Server();
        const res = server.hendleRequest(req);
        callback(res);
    }, 3000)
}

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

export function downloading(during = 3000) {
    console.log("start downloading ...");
    delay(during);
    console.log("end downloading");
}






