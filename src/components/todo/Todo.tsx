"use client";


// Packages -------------------------------------------------------------------------
import type { Doc } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
// Stores----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { api } from "@/../convex/_generated/api";
import TodoForm from "./TodoForm";
import { useState } from "react";
import { Toggle } from "../shadcn/ui/toggle";
import { cn } from "@/lib/shadcn";
import { Button } from "../shadcn/ui/button";
import { CircleMinusIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Card, CardContent } from "../shadcn/ui/card";



//______________________________________________________________________________________
// ===== Component =====

export default function Todo({ className, todo }: Readonly<{ className?: string, todo: Doc<"todo"> }>) {

    //______________________________________________________________________________________
    // ===== Constants =====
    const { _id, display, description, isCompleted } = todo;

    //______________________________________________________________________________________
    // ===== Mutations =====
    const updateTodoIsCompleted = useMutation(api.todo.updateTodoIsCompleted);
    const deleteTodo = useMutation(api.todo.deleteTodo);

    //______________________________________________________________________________________
    // ===== State =====
    const [isEditing, setIsEditing] = useState(false)
    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <Card className="p-0 py-4 my-4">
            <CardContent>
                <div className="flex flex-row gap-2">
                    <Toggle
                        className="data-[state=on]:bg-accent-foreground data-[state=on]:text-secondary"
                        variant="outline"
                        pressed={isCompleted ?? false}
                        onPressedChange={() => updateTodoIsCompleted({ _id, isCompleted: !isCompleted })}
                    >
                        {` `}
                    </Toggle>
                    {isEditing 
                        ? <>
                            <TodoForm todo={todo} onSubmitClient={() => setIsEditing(false)} />
                            <Button className="max-w-[36px]" variant="destructive" onClick={() => setIsEditing(false)}>
                                <CircleMinusIcon />
                            </Button>
                        </>
                        : <>
                            <div className="flex flex-col gap-2 w-full">
                                <p className={`p-2 text-sm ${isCompleted ? "text-muted-foreground line-through" : ""}`}>{display}</p>
                                {description && <p className={`pl-2 pb-2 text-sm  ${isCompleted ? "text-muted-foreground line-through" : ""}`}>{description}</p>}
                            </div>
                            <Button className="max-w-[36px]" onClick={() => setIsEditing(true)}>
                                <PencilIcon />
                            </Button>
                            <Button className="max-w-[36px]" variant="destructive" onClick={() => deleteTodo({ _id })}>
                                <Trash2Icon />
                            </Button>
                        </>
                    } 
                </div>
            </CardContent>
        </Card>
    )
}
