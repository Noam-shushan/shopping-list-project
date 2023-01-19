import { UserStore } from "./usersService";

import { Request, Rosponse } from "../network/networks.js";


const urls = {
    "/users": new UserStore(),
    "/products": productsService,
    "/groselyList": groselyListService,
    "/login": loginService,
}


export function response(request) {
    let jsonContent = createResponseContent(request);

    let httpHeader = "HTTP/1.1 200 OK\r\n"
        + "Content-Type: applection/json\r\n" +
        + "Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\r\n"
        + "Content-Length: " + jsonContent.length + "\r\n"
        + "\r\n";

    return new Response(httpHeader, jsonContent);
}


/**
 * 
 * @param {Request} request 
 * @returns {Rosponse} response
 */
function createResponseContent(request) {
    let response = "";
    let url = request.url;
    let method = request.method;
    let body = request.body;

    let service = urls[url];
    if (service) {
        response = service[method](body);
    } else {
        response = "404 Not Found";
    }

    return response;
}





