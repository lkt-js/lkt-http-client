export class ResourceBuild {
    constructor(url, method, data, auth, statusValidator, headers) {
        this.url = url;
        this.method = method;
        this.data = data;
        if (Object.keys(auth).length > 0)
            this.auth = auth;
        this.statusValidator = statusValidator;
        this.headers = headers;
    }
}
