import { Server } from "../server/server.js";


/**
 * 
 * @param {string} httpRequest 
 * @returns {Response} response
 */
export function getResponseHeader(httpRequest) {
    try {
        const server = new Server();

        let request = new Request(httpRequest);

        let httpResponse = server.getResponseHeader(request);

        return new ResponseHeader(httpResponse);
    }
    catch (error) {
        return new ResponseHeader("HTTP/1.1 400 Bad Request\r\n\r\n" );
    }
}

export function getResponseBody(httpRequest) {
    try {
        const server = new Server();

        let request = new Request(httpRequest);

        let httpResponse = server.getResponseContent(request);

        return new ResponseContent(httpResponse);
    }
    catch (error) {
        return new ResponseHeader("HTTP/1.1 400 Bad Request\r\n\r\n" );
    }

}

/**
 * Defines the request object
 */
export class Request {
    constructor(httpRequest) {
        let lines = httpRequest.split("\r\n");
        [this.method, this.url] = this.valideteRequest(lines);
        this.setHeaders(lines);
        if (this.method === "POST") {
            this.body = lines[lines.length - 1];
        }
    }

    valideteRequest(lines) {
        let firstLine = lines[0].split(" ");
        if (firstLine.length !== 3) {
            throw new Error("Invalid request");
        }
        const [method, url, httpVersion] = firstLine;
        if (httpVersion !== "HTTP/1.1") {
            throw new Error("Invalid HTTP version");
        }
        if (!method || !["GET", "POST", "PUT", "DELETE"].includes(method)) {
            throw new Error("Invalid method");
        }
        if (!url) {
            throw new Error("Invalid url");
        }
        return [method, url];
    }

    setHeaders(lines) {
        this.headers = {};
        for (let i = 1; i < lines.length; i++) {
            let line = lines[i];
            if (line) {
                let header = line.split(": ");
                this.headers[header[0]] = header[1];
            }
        }
    }
}

// /**
//  * Defines the response object
//  */
// export class Response {
//     constructor(httpResponse) {
//         let lines = httpResponse.split("\r\n");
//         this.httpHeader = lines[0];
//         this.content = lines[lines.length - 1];
//         this.statusCode = Number(this.httpHeader.split(" ")[1]);
//     }
// }

export class ResponseHeader {
    constructor(httpResponse) {
        let lines = httpResponse.split("\r\n");
        this.httpHeader = lines[0];
        this.statusCode = Number(this.httpHeader.split(" ")[1]);
    }
}

function delay(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

export function downloading (during = 20000) {
    console.log("start downloading ...")
    delay(during) 
    console.log("end downloading")
}


export class ResponseContent {
    constructor(httpResponse) {
        this.content = lines[lines.length - 1];
    }
}


