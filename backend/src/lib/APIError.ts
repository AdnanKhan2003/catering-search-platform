interface APIErrorInterface<T> {
    success: boolean;
    data: null;
    message: string;
    statusCode: number;
    errors: T;
    stack?: string;
};

class APIError<T> extends Error implements APIErrorInterface<T> {
    public success : boolean;
    public statusCode : number;
    public data : null;
    public errors : T;

    constructor(statusCode: number, message: string, errors: unknown = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.data = null;
        this.errors = errors as T;

        if (stack) this.stack = stack;
        else Error.captureStackTrace(this, this.constructor);
    }
};

export { APIError };