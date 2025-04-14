export type loginPayload = {
    email:string;
    password:string;
}

export type credentialUser = {
    meta:{
        status: true;
        code: 201;
        message: string;
    },
    result:{
        id: number;
        name: string;
        email: string;
        role: "STUDENT" | "TEACHER";
        accessToken: string;
        refreshToken: string;
    }
}