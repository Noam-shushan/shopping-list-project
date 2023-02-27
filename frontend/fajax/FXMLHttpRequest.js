import * as network from '../../backend/network/networks.js';
import { Response } from '../../utils/HttpResponse.js';


/**
 * The class that handles the request and response
*/
export class FXMLHttpRequest {
    constructor() {
        /**
         * Defines a function to be called when the request is received
         * @type {function}
         */
        this.onload = () => { };

        /**
         * Defines a function to be called when the request has an error
         * @type {function}
         */
        this.onerror = () => { };

        /**
         * Returns the status-number of a request
         * @type {number}
         */
        this.status = 0;

        /**
         * Returns the response data as a string
         * @type {string}
         */
        this.responseText = '';
    }
    /**
     * Specifies the request
     * @param {string} method the request type GET or POST
     * @param {string} url the file location
     * @param {boolean} async true (asynchronous) or false (synchronous)
     */
    open(method, url, async = true) {
        this.httRequestText = `${method} ${url} HTTP/1.1\r\n`;
        this.async = async;
    }

    /**
     * Sends the request to the server
     * If the request is GET method, the body parameter is ignored
     * @param {*} body the body of the request in POST method, optional, default is null
     */
    send(body = null) {
        if (body) {
            const bodyJson = JSON.stringify(body);
            this.setRequestHeader('Content-Length', bodyJson.length);
            this.setRequestHeader('Content-Type', 'application/json');
            this.httRequestText += `\r\n${bodyJson}`;
        }
        else {
            this.httRequestText += `\r\n`;
        }
        if (this.async) {
            network.sendAsync(this.httRequestText, (httpResponse) => {
                this.handelResponse(httpResponse);
            });
        }
        else {
            let httpResponse = network.send(this.httRequestText);
            this.handelResponse(httpResponse)
        }
    }

    handelResponse(httpResponse) {
        const response = new Response(httpResponse);
        this.status = response.statusCode;
        this.responseText = response.body;
        if (this.status < 400 && this.status > 199) {
            this.onload();
        }
        else {
            this.onerror();
        }
    }

    setRequestHeader(header, value) {
        this.httRequestText += `${header}: ${value}\r\n`;
    }
}