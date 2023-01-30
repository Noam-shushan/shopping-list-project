export class Response {
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
 * The http response class
 */
export class HttpResponse {
    constructor() {

    }

    /**
     * Generate http ok response
     * the data will transform to json 
     * @param {*} data 
     */
    ok(data) {
        const jsonData = JSON.stringify(data);
        let response = STATUS_CODE[200]
            + "Content-Type: application/json\r\n"
            + `Date: ${new Date().toString()}\r\n`
            + `Content-Length: ${jsonData.length}\r\n\r\n`
            + jsonData;

        return response;
    }

    notFound(errorMsg) {
        let response = STATUS_CODE[404]
            + "Content-Type: text/html\r\n"
            + `Date: ${new Date().toString()}\r\n`
            + `Content-Length: ${errorMsg.length}\r\n\r\n`
            + errorMsg;
        return response;
    }

    badRequest(errorMsg) {
        let response = STATUS_CODE[400]
            + "Content-Type: text/html\r\n"
            + `Date: ${new Date().toString()}\r\n`
            + `Content-Length: ${errorMsg.length}\r\n\r\n`
            + errorMsg;
        return response;
    }

    internalServerError(errorMsg) {
        let response = STATUS_CODE[500]
            + "Content-Type: text/html\r\n"
            + `Date: ${new Date().toString()}\r\n`
            + `Content-Length: ${errorMsg.length}\r\n\r\n` +
            errorMsg;
        return response;
    }
}
