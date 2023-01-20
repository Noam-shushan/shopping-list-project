import { UserStore } from "./usersService.js";

import { Request } from "../network/networks.js";


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
    /**
     * Returns the response of the server as a string following the HTTP protocol
     * @param {Request} request 
     * @returns {string} http response
     */
    response(request) {
        let content = this.createResponseContent(request);
        let jsonContent = JSON.stringify(content);

        let httpHeader = "HTTP/1.1 200 OK\r\n"
            + "Content-Type: applection/json\r\n"
            + "Access-Control-Allow-Methods: GET, POST, PUT, DELETE\r\n"
            + "Content-Length: " + jsonContent.length + "\r\n\r\n";

        return httpHeader + jsonContent;
    }
    /**
     * 
     * @param {Request} request 
     * @returns {object} response content as an object
     */
    createResponseContent(request) {
        let response = "";

        const service = urls[request.url];
        if (service) {
            const method = service.route[request.method];
            response = method(request.body);
        } else {
            response = { error: "404 Not Found" };
        }

        return response;
    }
}





