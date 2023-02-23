/**
 * Http response class
 */
export class Response {
    /**
     * 
     * @param {string} responseText the http response text
     */
    constructor(responseText) {
        let lines = responseText.split("\r\n");
        this.statusCode = Number(lines[0].split(" ")[1]);
        this.header = lines.slice(1, lines.indexOf("")).join("\r\n");
        this.body = lines.slice(lines.indexOf("") + 1).join("\r\n");
    }
}

const STATUS_CODE = {
    200: "HTTP/1.1 200 OK\r\n",
    404: "HTTP/1.1 404 Not Found\r\n",
    400: "HTTP/1.1 400 Bad Request\r\n",
    500: "HTTP/1.1 500 Internal Server Error\r\n"
}


/**
 * Generate http ok response
 * the data will transform to json 
 * @param {*} data any data type
 * @returns response with status code 200 and json data
 */
export function ok(data) {
    const jsonData = JSON.stringify(data);
    let response = STATUS_CODE[200]
        + "Content-Type: application/json\r\n"
        + `Date: ${new Date().toString()}\r\n`
        + `Content-Length: ${jsonData.length}\r\n\r\n`
        + jsonData;

    return response;
}

/**
 * Generate http not found response
 * @param {string} errorMsg the error message
 * @returns response with status code 404
 */
export function notFound(errorMsg) {
    let response = STATUS_CODE[404]
        + "Content-Type: text/html\r\n"
        + `Date: ${new Date().toString()}\r\n`
        + `Content-Length: ${errorMsg.length}\r\n\r\n`
        + errorMsg;
    return response;
}

/**
 * Generate http bad request response
 * @param {string} errorMsg the error message
 * @returns the response with status code 400
 */
export function badRequest(errorMsg) {
    let response = STATUS_CODE[400]
        + "Content-Type: text/html\r\n"
        + `Date: ${new Date().toString()}\r\n`
        + `Content-Length: ${errorMsg.length}\r\n\r\n`
        + errorMsg;
    return response;
}

/**
 * Generate http internal server error response
 * @param {string} errorMsg the error message
 * @returns the response with status code 500
 */
export function internalServerError(errorMsg) {
    let response = STATUS_CODE[500]
        + "Content-Type: text/html\r\n"
        + `Date: ${new Date().toString()}\r\n`
        + `Content-Length: ${errorMsg.length}\r\n\r\n` +
        errorMsg;
    return response;
}

