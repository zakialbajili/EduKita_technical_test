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

export type AccountType = {
    name: string
    email: string
    password?: string
    role: "STUDENT" | "TEACHER"
}