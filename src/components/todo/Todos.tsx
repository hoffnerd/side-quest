"use client";


// Packages -------------------------------------------------------------------------
import { useQuery } from "convex/react";
// Stores----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { api } from "@/../convex/_generated/api";
import TodoForm from "./TodoForm";
import { useState } from "react";
import { Toggle } from "../shadcn/ui/toggle";
import Todo from "./Todo";
import { AlertCircleIcon } from "lucide-react";
import { Alert } from "@/_legoBlocks/nextjsCommon/components/Alert";



//______________________________________________________________________________________
// ===== Component =====

export default function Todos({ className }: Readonly<{ className?: string }>) {

    //______________________________________________________________________________________
    // ===== Queries =====
    const queryTodos = useQuery(api.todo.readTodos)!;

    //______________________________________________________________________________________
    // ===== State =====
    const [editingId, setEditingId] = useState(null)
    
    //______________________________________________________________________________________
    // ===== Component Return =====

    if(queryTodos?.error) return <Alert>{queryTodos?.message}</Alert>;

    if(queryTodos === undefined) return <div>Loading...</div>;

    return (
        <div className={className}>
            {queryTodos?.data?.map(todo => <Todo key={todo._id} todo={todo}/>)}
        </div>
    )
}
