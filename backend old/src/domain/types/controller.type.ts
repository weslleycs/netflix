export type controllerInputType<H = object, P = object, Q = object, B = object> = {
    headers: H;
    params: P;
    query: Q;
    body: B;
};

export type httpResponseType<T = unknown> = {
    statusCode: number;
    data: T;
};