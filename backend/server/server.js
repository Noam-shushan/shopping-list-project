import { UserStore } from "./usersService.js";

import { Request } from "../network/networks.js";

const STATUS_CODE = {
    200: "HTTP/1.1 200 OK\r\n",
    404: "HTTP/1.1 404 Not Found\r\n",
    302: "HTTP/1.1 302 Moved Temporarily\r\n",
    500: "HTTP/1.1 500 Internal Server Error\r\n"
}


const urls = {
    "/users": new UserStore(),
}

/**
 * The server class
 * get the request and create the response
 */
// TODO: Implement POST, PUT, DELETE
// TODO: Implement other response types (e.g. 404, 403, 500)
export class Server {
    constructor() {
    }
    // /**
    //  * Returns the response of the server as a string following the HTTP protocol
    //  * @param {Request} request 
    //  * @returns {string} http response
    //  */
    // response(request) {
    //     let content = this.createResponseContent(request);
    //     let jsonContent = JSON.stringify(content);

    //     let httpHeader = "HTTP/1.1 200 OK\r\n"
    //         + "Content-Type: applection/json\r\n"
    //         + "Access-Control-Allow-Methods: GET, POST, PUT, DELETE\r\n"
    //         + "Content-Length: " + jsonContent.length + "\r\n\r\n";

    //     return httpHeader + jsonContent;
    // }

    getResponseHeader(request) {
        const service = urls[request.url];
        let httpHeader = "";
        if (!service) {
            httpHeader = STATUS_CODE[404];
            httpHeader += "Content-Type: text/html\r\n";
            httpHeader += `Date: ${new Date().toString()}\r\n`;
            httpHeader += "Server: nginx/0.8.54\r\n";
            httpHeader += "Content-Length: 0\r\n\r\n";
        } else {    
            httpHeader = STATUS_CODE[200];
            httpHeader += "Content-Type: application/json\r\n";
            httpHeader += `Date: ${new Date().toString()}\r\n`;
            httpHeader += "Server: nginx/0.8.54\r\n";
            httpHeader += "Content-Length: 0\r\n\r\n";
        }
        return httpHeader;
    }

    /**
     * 
     * @param {Request} request 
     * @returns {object} response content as an object
     */
    getResponseContent(request) {
        let response = "";
        const method = service.route[request.method];
        response = method(request.body);

        return response;
    }
}





