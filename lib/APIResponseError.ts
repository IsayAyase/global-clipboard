export default class APIResponseError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = "APIResponseError";
        this.statusCode = statusCode;
    }
}
