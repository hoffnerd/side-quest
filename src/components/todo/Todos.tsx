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



//______________________________________________________________________________________
// ===== Component =====

export default function Todos({ className }: Readonly<{ className?: string }>) {

    //______________________________________________________________________________________
    // ===== Queries =====
    const todos = useQuery(api.todo.readTodos);

    //______________________________________________________________________________________
    // ===== State =====
    const [editingId, setEditingId] = useState(null)
    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className={className}>
            {todos?.map(todo => <Todo key={todo._id} todo={todo}/>)}
        </div>
    )
}
