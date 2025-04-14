export type loginPayload = {
    email:string;
    password:string;
}
export type registerPayload = {
    email:string;
    password:string;
    role: "STUDENT" | "TEACHER";
    name: string
}
export type credentialUser = {
    meta:{
        status: true;
        code: 201;
        message: string;
    },
    results:{
        id: number;
        name: string;
        email: string;
        role: "STUDENT" | "TEACHER";
        accessToken: string;
        refreshToken: string;
    }
}