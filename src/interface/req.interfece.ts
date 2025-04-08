export interface Payload {
    sub: number, 
    email: string, 
    roles: string 
}

export interface Req extends Request {
    payload?: Payload
}