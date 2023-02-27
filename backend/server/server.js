import { Request } from "../../utils/Request.js";
import { ModelRepository } from "./ModelRepository.js";
import { UsersRepository } from "./UsersRepository.js";
import * as http from "../../utils/HttpResponse.js";
import { LoginSingup } from "./LoginSingup.js";


/**
 * The server class
 * get the request and create the response
 */
export class Server {
    constructor() {
        // the urls and the services
        this.urls = {
            "/api/users": new UsersRepository(),
            "/api/products": new ModelRepository('products'),
            "/api/shopping-lists": new ModelRepository('shopping-lists'),
            '/api/login-singup': new LoginSingup(),
        }
    }

    /**
     * Handle the request and create the response
     * @param {string} httpRequest
     */
    hendleRequest(httpRequest) {
        let request = null;
        try { //  create request object, if the request is invalid, send 400
            request = new Request(httpRequest);
        }
        catch (error) {
            return http.badRequest(error);
        }

        const service = this.urls[request.urlWitoutParameters];
        if (!service) { // if the url is not found, send 404
            return http.notFound(`404 Not Found\nthe url: '${request.urlWitoutParameters}'`);
        }
        try {
            const method = service.route[request.method]; // GET, POST, PUT, DELETE

            let responseContent = '';
            if (request.method.startsWith('GET') || request.method === 'DELETE') {
                responseContent = method.call(service, request.parameters);
            } else {
                responseContent = method.call(service, request.body);
            }
            return http.ok(responseContent);
        }
        catch (error) {
            return http.internalServerError(error);
        }
    }
}





