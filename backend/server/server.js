import { UserStore } from "./usersService";

import { Request, Rosponse } from "../network/networks.js";


const urls = {
    "/users": new UserStore(),
    "/products": productsService,
    "/groselyList": groselyListService,
    "/login": loginService,
}

/**
 * The server class
 * get the request and create the response
 */
export class Server {
    constructor() {
    }

    response(request) {
        let content = createResponseContent(request);
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
     * @returns {Rosponse} response
     */
    createResponseContent(request) {
        let response = "";

        let service = urls[request.url];
        if (service) {
            response = service[request.method](request.body);
        } else {
            response = { error: "404 Not Found" };
        }

        return response;
    }
}





