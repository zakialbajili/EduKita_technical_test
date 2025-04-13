export type loginPayload = {
    email: string;
    password: string;
}

export type registerPayload = {
    name:string;
    email: string;
    password: string;
    role: "STUDENT" | "TEACHER";
}
type userProfile = {
    name: string;
    role: "STUDENT" | "TEACHER";
}
export type AccountType = {
    id?:number;
    email: string;
    password?: string;
    userProfile:userProfile
}