import * as network from '../../backend/network/networks.js';
import { Response } from '../../utils/HttpResponse.js';



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
         * 200: "OK"
         * 403: "Forbidden"
         * 404: "Not Found"
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
     * @param {*} body the body of the request in POST method, optional
     */
    send(body = '') {
        if (body) {
            this.setRequestHeader('Content-Length', body.length);
            this.httRequestText += `\r\n${body}`;
        }
        else {
            this.httRequestText += `\r\n`;
        }
        let httpResponse = '';
        if (this.async) {

        }
        else {
            httpResponse = network.send(this.httRequestText);
        }
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