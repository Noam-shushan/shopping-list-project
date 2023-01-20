import { createHttpRequest } from '../../backend/network/networks.js';


export class FXMLHttpRequest {
    constructor() {
        /**
         * Defines a function to be called when the request is recieved
         * @type {function}
         */
        this.onload = () => { };
        /**
         * Returns the status-number of a request
         * 200: "OK"
         * 403: "Forbidden"
         * 404: "Not Found"
         * @type {Number}
         */
        this.status = 0;
        /**
         * Holds the status of the FXMLHttpRequest.
         * 0: request not initialized
         * 1: server connection established
         * 2: request received
         * 3: processing request
         * 4: request finished and response is ready
         * @type {Number}
         * @readonly   
         */
        this.readyState = 0;
        /**
         * Returns the response data as a string
         * @type {string}
         */
        this.responseText = '';
        /**
         * Returns the status-text (e.g. "OK" or "Not Found")
         * @type {string}
         * @readonly
         */
        this.statusText = '';
    }
    /**
     * Specifies the request
     * @param {string} method the request type GET or POST
     * @param {string} url the file location
     * @param {boolean} async true (asynchronous) or false (synchronous)
     */
    open(method, url, async = false) {
        this.readyState = 1;
        this.httpRequestHeader = `${method} ${url} HTTP/1.1\r\n`;
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
            this.httpRequestHeader += `\r\n${body}`;
        }
        else {
            this.httpRequestHeader += `\r\n`;
        }
        this.readyState = 2;
        const response = createHttpRequest(this.httpRequestHeader);
        this.readyState = 3;
        if (response.statusCode < 400 && response.statusCode > 199) {
            this.status = response.statusCode;
            this.responseText = response.content;
            this.readyState = 4;
        }
    }
    setRequestHeader(header, value) {
        this.httpRequestHeader += `${header}: ${value}\r\n`;
    }
}