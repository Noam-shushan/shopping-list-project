export class Request {
    url;
    method;
    body;
}

export class Response {
    constructor(httpHeader, content, contentType = "json") {
        this.httpHeader = httpHeader;
        this.content = content;
        this.contentType = contentType;
    }
}