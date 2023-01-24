const STATUS_CODE = {
    200: "HTTP/1.1 200 OK\r\n",
    404: "HTTP/1.1 404 Not Found\r\n",
    400: "HTTP/1.1 400 Bad Request\r\n",
    500: "HTTP/1.1 500 Internal Server Error\r\n"
}

export class Response {
    constructor(header, body, statusCode) {
        this.header = header;
        this.body = body;
        this.statusCode = statusCode;
    }
}

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
        let header = STATUS_CODE[200]
            + "Content-Type: application/json\r\n"
            + `Date: ${new Date().toString()}\r\n`
            + `Content-Length: ${jsonData.length}\r\n\r\n`;

        return new Response(header, jsonData, 200);
    }

    notFound(errorMsg) {
        let header = STATUS_CODE[404]
            + "Content-Type: text/html\r\n"
            + `Date: ${new Date().toString()}\r\n`
            + `Content-Length: ${errorMsg.length}\r\n\r\n`;
        return new Response(header, errorMsg, 404);
    }

    badRequest(errorMsg) {
        let header = STATUS_CODE[400]
            + "Content-Type: text/html\r\n"
            + `Date: ${new Date().toString()}\r\n`
            + `Content-Length: ${errorMsg.length}\r\n\r\n`;
        return new Response(header, errorMsg, 400);
    }

    internalServerError(errorMsg) {
        let header = STATUS_CODE[500]
            + "Content-Type: text/html\r\n"
            + `Date: ${new Date().toString()}\r\n`
            + `Content-Length: ${errorMsg.length}\r\n\r\n`;
        return new Response(header, errorMsg, 500);
    }
}
