import { UserStore } from "./usersService.js";

import { Request, Response } from "../network/networks.js";


const urls = {
    "/users": new UserStore(),
}

/**
 * The server class
 * get the request and create the response
 */
export class Server {
    constructor() {
    }

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
     * @returns {Response} response
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





