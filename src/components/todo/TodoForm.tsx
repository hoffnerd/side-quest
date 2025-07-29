"use client";

// Types -------------------------------------------------------------------------
import type { Doc, Id } from "@/../convex/_generated/dataModel";
// Packages -------------------------------------------------------------------------
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { z } from "zod/v4";
// Stores----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import InputOutputForm from "@/_legoBlocks/input-output-form/components/InputOutputForm";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { api } from "@/../convex/_generated/api";
import { cn } from "@/lib/shadcn";
import { SaveIcon } from "lucide-react";



//______________________________________________________________________________________
// ===== Zod Schema =====

const defaultZodSchema = z.object({
    display: z.string().min(2, { message: "Display must be at least 2 characters.", }),
});

const updateZodSchema = z.object({
    display: z.string().min(2, { message: "Display must be at least 2 characters.", }),
    description: z.string(),
    // isCompleted: z.boolean(),
    // items: z.array(z.string()).refine((value) => value.some((item) => item), {
    //     message: "You have to select at least one item.",
    // }),
    // items: z.object({
    //     item1: z.boolean(),
    //     item2: z.boolean(),
    //     item3: z.boolean(),
    // }),
});


//______________________________________________________________________________________
// ===== Component =====

export default function TodoForm({ todo, onSubmitClient }: Readonly<{ todo?: Doc<"todo">, onSubmitClient?: (data: { values: any, response: any }) => void }>) {

    //______________________________________________________________________________________
    // ===== Constants =====

    const defaultFieldDetails = {
        display: {
            defaultValue: todo?.display ?? "",
            placeholder: "New Todo", 
            className: "w-full"
        },
    }

    const updateTodoFieldDetails = {
        // isCompleted: {
        //     type: "toggle",
        //     variant: "outline",
        //     defaultValue: todo?.isCompleted ?? false,
        //     classNames: {
        //         formInputWrapper: "items-start",
        //     }
        // },
        display: {
            ...defaultFieldDetails.display,
            placeholder: todo?.display ?? "Edit Todo", 
            className: "",
        },
        description: {
            defaultValue: todo?.description ?? "",
            placeholder: "Description",
        },
        // items: {
        //     label: "Checklist Items",
        //     description: "Select at least one item.",
        //     type: "checkboxes",
        //     items: {
        //         item1: { label: "Item 1" },
        //         item2: { label: "Item 2", defaultValue: true },
        //         item3: { label: "Item 3" },
        //     }
        // }
    }


    //______________________________________________________________________________________
    // ===== Mutations =====
    const createTodo = useMutation(api.todo.createTodo);
    const updateTodo = useMutation(api.todo.updateTodo);
    


    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <InputOutputForm
            className={cn("space-y-0 flex flex-row gap-2 w-full")}
            classNames={{
                submitButton: `max-w-[36px] ${todo?._id ? "" : "mr-17"}`,
            }}
            zodSchema={todo?._id ? updateZodSchema : defaultZodSchema}
            fieldDetails={todo?._id ? updateTodoFieldDetails : defaultFieldDetails}
            onSubmitServer={todo?._id ? updateTodo : createTodo}
            onSubmitClient={onSubmitClient}
            options={{ 
                debug: false,
                submitText: <SaveIcon />,
                submittingText: <SaveIcon className="animate-spin" />,
                additionalData: { _id: todo?._id },
                groupDetails: todo?._id ? {
                    main: {
                        isGroup: true,
                        renders: {
                            display: { isInputKey: true },
                            description: { isInputKey: true },
                        },
                        className: "w-full",
                    }
                } : undefined,
                // groupDetails: todo?._id ? {
                //     topGroup: {
                //         isGroup: true,
                //         renders: {
                //             isCompleted: { isInputKey: true },
                //             nestedGroup: {
                //                 isGroup: true,
                //                 renders: {
                //                     display: { isInputKey: true },
                //                     description: { isInputKey: true },
                //                 },
                //                 className: "w-full",
                //             },
                //         },
                //         className: "flex flex-row gap-2",
                //     }
                // } : undefined,
            }}
        />
    )
}
