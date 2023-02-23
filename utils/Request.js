/**
 * Defines the request object
 */
export class Request {
    constructor(httpRequest) {
        let lines = httpRequest.split("\r\n");
        [this.method, this.url] = this.valideteRequest(lines);
        this.setHeaders(lines);
        if (this.method === "POST") {
            this.jsonBody = lines[lines.length - 1];
            this.body = JSON.parse(this.jsonBody);
        }
        this.parameters = this.getParameters();
        this.urlWitoutParameters = this.url.split("?")[0];
    }

    valideteRequest(lines) {
        let firstLine = lines[0].split(" ");
        if (firstLine.length !== 3) {
            throw "Invalid request";
        }
        const [method, url, httpVersion] = firstLine;
        if (httpVersion !== "HTTP/1.1") {
            throw "Invalid HTTP version";
        }
        if (!method || !["GET", "POST", "PUT", "DELETE"].includes(method)) {
            throw "Invalid method";
        }
        if (!url) {
            throw "Invalid url";
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

    getParameters() {
        let parameters = {};
        if (this.method === "GET") {
            let url = this.url.split("?");
            if (url.length > 1) {
                let params = url[1].split("&");
                params.forEach(param => {
                    let [key, value] = param.split("=");
                    parameters[key] = value;
                });
            }
        }
        return parameters;
    }
}