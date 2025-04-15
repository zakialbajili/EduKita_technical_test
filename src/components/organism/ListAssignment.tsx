"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import api from "@/axios/config";
import { QueryClientProvider, useQuery, QueryClient } from "@tanstack/react-query";
import { Assignment, AssignmentResponse } from "@/lib/types/assignmentTypes";
import Loading from "../atoms/loading";
import Swal from "sweetalert2";


interface propsListAssignment {
    type?:"all"|"subject";
    subject?:"MATEMATHIC" | 'ENGLISH';
    scope:"teacher"|"student";
    studentTab?:"send"|"result"
    studentId?:number;
}
const queryClient = new QueryClient()
const TemplateListAssignment:React.FC<propsListAssignment> = ({type="all", subject, scope, studentTab, studentId}) => {
    const fetchAPIListAssignment = async (): Promise<AssignmentResponse> => {
        if(scope === "teacher"){
            const { data } = await api.get("/assignments");
            return data;
        } else{
            // `/assignments/send?id=${studentId}`
            const { data } = await api.get(studentTab === "send"?`/assignments/send/${studentId}`:`/grades/${studentId}`);
            console.log(data)
            return data;
        }
      };
      
    const [currentListAssignment, setCurrentListAssignment] = useState<Assignment[]|null>(null)
    const {
        data: ListAssignment,
        isLoading,
        isError
      } = useQuery<AssignmentResponse>({
        queryKey: ["listAssignment", type, scope],
        queryFn: fetchAPIListAssignment
    });
    useEffect(()=>{
        if(ListAssignment?.results){
            if(type === "all"){
                setCurrentListAssignment(ListAssignment.results)
            } else if(type === "subject" && subject){
                const bySubject = ListAssignment.results.filter((item:Assignment)=> item.subject === subject)
                setCurrentListAssignment(bySubject)
            } else if(studentId && studentTab === "result"){
                setCurrentListAssignment(ListAssignment.results)
            }else if(studentId && studentTab === "send"){
                setCurrentListAssignment(ListAssignment.results)
            }
        }
    },[ListAssignment, type, subject, studentId, studentTab])
    if(isLoading){
        return <Loading />
    }
    if(isError){
        Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Error occured when request data.",
                timer: 1500,
                showConfirmButton: false,
        });
    }
    return(
        <div className="w-full h-full flex flex-col gap-3">
            {currentListAssignment && currentListAssignment.length > 0 ? 
                (
                    currentListAssignment.map((item:Assignment, index:number)=>(
                    <Link
                        key={index}
                        href={`/dashboard/${scope}/assignment/detail?id=${item.id}&student=${item.iduser}`}
                        className={
                            `w-full p-3 ${item.subject==="MATEMATHIC" ?"bg-accent-green/30":"bg-accent-skyblue/30"} rounded-lg flex flex-col gap-2`
                        }
                    >
                        <div>
                            <h2 className="text-lg font-bold">{item.title}</h2>
                            <h3 className="font-semibold text-sm">{item.subject}</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-xs">{item.content}</p>
                    </Link>
                    ))
                ):(
                    <>Tidak ada data</>
                )
            }
        </div>
    )
}
const ListAssignment:React.FC<propsListAssignment> = ({type="all", subject, scope, studentTab, studentId}) => {
    return(
        <QueryClientProvider client={queryClient}>
            <TemplateListAssignment
                type={type}
                subject={subject}
                scope={scope}
                studentTab={studentTab}
                studentId={studentId}
            />
        </QueryClientProvider>
    )
}
export default ListAssignment