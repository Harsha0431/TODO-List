enum ResponseType {
    FAILED = 0,
    SUCCESS = 1,
}

export interface Response<T> {
    code: ResponseType
    message?: string
    data?: T
    errorCause?: string
}