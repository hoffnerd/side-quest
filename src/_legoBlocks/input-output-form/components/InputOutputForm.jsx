"use client";

// Types ---------------------------------------------------------------------------
// Packages ------------------------------------------------------------------------
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Server --------------------------------------------------------------------------
// Components ----------------------------------------------------------------------
import { Button } from "@/components/shadcn/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { useEffect } from "react";
// Data ----------------------------------------------------------------------------
// Other ---------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_FIELD_DETAILS_ITEM = {
    label: "",
    description: "",
    placeholder: "",
    defaultValue: "",
    type: "text",
}



//______________________________________________________________________________________
// ===== Pure Functions =====

const getDefaultValues = (fieldDetails={}) => {
    let defaultValues = {};
    Object.entries(fieldDetails).forEach(([key, fieldDetailsItem]) => {
        defaultValues[key] = fieldDetailsItem?.defaultValue ?? DEFAULT_FIELD_DETAILS_ITEM.defaultValue;
    });
    return defaultValues;
}



//______________________________________________________________________________________
// ===== Micro-Components =====

function FormInput({ field, fieldDetailsItem={} }){
    switch (fieldDetailsItem.type) {
        default: return <Input placeholder={fieldDetailsItem?.placeholder ?? ""} {...field} />
    }
}



//______________________________________________________________________________________
// ===== Component =====

/**
 * 
 * @param {object} props
 * @param {ZodSchema} props.zodSchema
 * @param {object} [props.fieldDetails]
 * @param {function} props.onSubmitServer
 * @param {function} [props.onSubmitClient]
 */
export default function InputOutputForm({ zodSchema, fieldDetails={}, onSubmitServer, onSubmitClient }) {

    //______________________________________________________________________________________
    // ===== Hooks =====
    const form = useForm({
        resolver: zodResolver(zodSchema),
        defaultValues: getDefaultValues(fieldDetails),
    });



    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        const callback = form.subscribe({
            formState: { values: true },
            callback: ({ values }) => {
                if(form?.formState?.errors?.root) form.setError("root", undefined);
            }
        })
        return () => callback();
    }, [form.subscribe])
    


    //______________________________________________________________________________________
    // ===== Functions =====

    const onSubmit = async (values) => {
        const response = onSubmitServer 
            ? await onSubmitServer(values)
            : { error: true, message:"Dev Error: onSubmitServer not given to InputOutputForm" };

        if(onSubmitClient) onSubmitClient(response);
        
        if(response?.error) form.setError(response?.data?.errorLocation ?? "root", { message: response?.message ?? "An unknown error occurred." });
    };



    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {zodSchema?.shape && Object.keys(zodSchema.shape).map((key) => {
                    const fieldDetailsItem = { ...DEFAULT_FIELD_DETAILS_ITEM, ...(fieldDetails?.[key] ?? {}) };
                    return (
                        <FormField
                            key={key}
                            name={key}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    {fieldDetailsItem?.label && (
                                        <FormLabel>{fieldDetailsItem.label}</FormLabel>
                                    )}
                                    <FormControl>
                                        <FormInput field={field} fieldDetailsItem={fieldDetailsItem} />
                                    </FormControl>
                                    {fieldDetailsItem?.description && (
                                        <FormDescription>{fieldDetailsItem.description}</FormDescription>
                                    )}
                                    <FormMessage className="text-center"/>
                                </FormItem>
                            )}
                        />
                    )
                })}
                <Button type="submit" className="w-full">Submit</Button>
                {form?.formState?.errors?.root?.message && (
                    <FormMessage className="text-center">{form.formState.errors.root.message}</FormMessage>
                )}
            </form>
        </Form>
    );
}
