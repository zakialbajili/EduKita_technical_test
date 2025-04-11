type metaTypes = {
    status:boolean;
    code:number;
    message:string;
}
function TMeta(status:boolean, code:number, message:string) {
    return{
        status,
        code,
        message
    }
}
function TResponseSuccess (meta:metaTypes, results:any) {
    return{
        meta,
        results
    }
}
function TResponseError (meta:metaTypes){
    return{
        meta
    }
}
export function successResponse (message:string, code:number, data:any) {
    return TResponseSuccess(TMeta(true, code, message), data)
}
export function errorResponse ( message:string, code:number) {
    return TResponseError(TMeta(false, code, message))
}