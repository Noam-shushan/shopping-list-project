import { UserStore } from "./usersService.js";
import { ProductStore } from "./productsService.js";
import { Request } from "../../utils/Request.js";
import { HttpResponse } from "../../utils/HttpResponse.js";

const urls = {
    "/users": new UserStore(),
    "/products": new ProductStore()
}

/**
 * The server class
 * get the request and create the response
 */
export class Server {
    constructor() {
    }

    /**
     *  
     */
    hendleRequest(httpRequest) {
        const http = new HttpResponse();
        let request = null;
        try { //  create request object, if the request is invalid, send 400
            request = new Request(httpRequest);
        }
        catch (error) {
            return http.badRequest(error);
        }

        const service = urls[request.url];
        if (!service) { // if the url is not found, send 404
            return http.notFound(`404 Not Found\nthe url: '${request.url}'`);
        }
        try {
            const method = service.route[request.method]; // GET, POST, PUT, DELETE
            let responseContent = method(request.body);
            return http.ok(responseContent);
        }
        catch (error) {
            return http.internalServerError(error);
        }
    }
}





