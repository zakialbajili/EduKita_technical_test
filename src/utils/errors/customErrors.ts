export class ValidationError extends Error {
    public type:string;
    constructor(message:string, detail:string){
        super(message)
        this.name = "AuthenticationError"
        this.type = detail
    }
}
export class AuthenticationError extends Error {
    constructor(message:string){
        super(message)
        this.name = "AuthenticationError"
    }
}