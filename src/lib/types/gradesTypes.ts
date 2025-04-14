export type formGrades = {
    feedback: string;
    grade: number;
}
export type payloadGrades = {
    teacherId:number;
    assignmentId:number
    feedback: string;
    grade: number;
}
export type Grades = {
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
export type GradesResponse = {
    meta:{
        staus:boolean;
        code:number;
        message:string;
    }
    results:Grades[]
}

// export type DetailAssignmentResponse = {
//     meta:{
//         staus:boolean;
//         code:number;
//         message:string;
//     },
//     results:Assignment
// }