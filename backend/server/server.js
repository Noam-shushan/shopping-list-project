import { Request } from "../../utils/Request.js";
import { ModelRepository } from "./ModelRepository.js";
import { HttpResponse } from "../../utils/HttpResponse.js";
import { LoginSingup } from "./Login.js";

// the urls and the services
const urls = {
    "/api/users": new ModelRepository('users'),
    "/api/products": new ModelRepository('products'),
    "/api/shopping-lists": new ModelRepository('shopping-lists'),
    '/api/login-singup': new LoginSingup(),
}

/**
 * The server class
 * get the request and create the response
 */
export class Server {
    constructor() {
    }

    /**
     * Handle the request and create the response
     * @param {string} httpRequest
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

        const service = urls[request.urlWitoutParameters];
        if (!service) { // if the url is not found, send 404
            return http.notFound(`404 Not Found\nthe url: '${request.urlWitoutParameters}'`);
        }
        try {
            const method = service.route[request.method]; // GET, POST, PUT, DELETE

            let responseContent = '';
            if (request.method === 'GET' || request.method === 'DELETE') {
                responseContent = method(request.parameters)
            } else {
                responseContent = method(JSON.parse(request.body));
            }

            return http.ok(responseContent);
        }
        catch (error) {
            return http.internalServerError(error);
        }
    }
}





