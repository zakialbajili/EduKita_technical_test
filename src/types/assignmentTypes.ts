export enum subjectFilter {
    ENGLISH = "ENGLISH",
    MATEMATHIC = "MATEMATHIC"
}

export type submitAssignment = {
    subject:subjectFilter;
    title:string;
    content:string;
    studentId:number;
}