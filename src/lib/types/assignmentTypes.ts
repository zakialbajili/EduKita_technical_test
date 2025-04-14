export type formAssignment = {
    subject: "ENGLISH" | "MATEMATHIC";
    title: string;
    content: string;
}
export type payloadAssignment = {
    subject: "ENGLISH" | "MATEMATHIC";
    title: string;
    content: string;
    studentId: number
}
export type Assignment = {
    id: number;
    iduser: number;
    subject: "ENGLISH" | "MATEMATHIC";
    title: string;
    content: string;
    feedback: string;
    grade: number;
    created_at: Date;
    updated_at: Date;
}
export type AssignmentResponse = {
    meta:{
        staus:boolean;
        code:number;
        message:string;
    }
    results:Assignment[]
}

export type DetailAssignmentResponse = {
    meta:{
        staus:boolean;
        code:number;
        message:string;
    },
    results:Assignment
}