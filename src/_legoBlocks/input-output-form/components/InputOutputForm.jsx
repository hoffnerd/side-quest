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
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
// Data ----------------------------------------------------------------------------
// Other ---------------------------------------------------------------------------
import { cn } from "@/lib/shadcn";
import { Toggle } from "@/components/shadcn/ui/toggle";
import { matchArrays } from "@/util";



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS = {
    debug: false,
    submitText: "Submit",
    submittingText: "Submitting...",
    additionalData: {},
    groupDetails: null,
}

const DEFAULT_FIELD_DETAILS_ITEM = {
    label: "",
    description: "",
    placeholder: "",
    type: "text",
}



//______________________________________________________________________________________
// ===== Pure Functions =====

const getDefaultValues = (fieldDetails={}, options={}) => {
    const { forceType } = { forceType: null, ...options };
    let defaultValues = {};
    Object.entries(fieldDetails).forEach(([key, fieldDetailsItem]) => {
        const type = forceType ?? fieldDetailsItem?.type;
        switch (type) {
            case "checkboxes": 
                defaultValues[key] = fieldDetailsItem?.defaultValue ?? getDefaultValues(fieldDetailsItem.items, { forceType: `${fieldDetailsItem.type}-item` });
                break;
            case "checkboxes-item":
            case "toggle":
                defaultValues[key] = fieldDetailsItem?.defaultValue ? true : false;
                break;
            case "placeholder": break;
            default: 
                defaultValues[key] = fieldDetailsItem?.defaultValue ?? "";
                break;
        }
    });
    return defaultValues;
}



//______________________________________________________________________________________
// ===== Micro-Components =====

function FormInput({ className, field, fieldDetailsKey="", fieldDetailsItem={}, nest=[] }){
    const renderInput = () => {
        switch (fieldDetailsItem.type) {
            case "checkboxes-item": return (
                <Checkbox
                    {...field}
                    className={className}
                    value={ [...(Object.keys(field.value) ?? [])].filter(key => field.value?.[key] === true).join(",") }
                    checked={field.value?.[fieldDetailsKey] ?? false}
                    onCheckedChange={( checked ) => {
                        let newFieldValue = { ...(field.value ?? {}) };
                        newFieldValue[fieldDetailsKey] = checked ? true : false;
                        return field.onChange(newFieldValue);
                    }}
                />
            )
            case "toggle": return (
                <Toggle
                    {...field}
                    className={cn("data-[state=on]:bg-accent-foreground data-[state=on]:text-secondary", className)}
                    variant={fieldDetailsItem?.variant}
                    value={field.value?.[fieldDetailsKey] ?? false}
                    onPressedChange={() => field.onChange(field.value?.[fieldDetailsKey] ? false : true)}
                >
                    {fieldDetailsItem?.children}
                </Toggle>
            )
            case "placeholder": return <div className={className}/>;
            default: return <Input {...field} className={className} placeholder={fieldDetailsItem?.placeholder ?? ""} />
        }
    }
    return <FormControl>{renderInput()}</FormControl>
}

function SubFormItems({ classNames, name, control, fieldDetailsKey="", fieldDetailsItem={}, nest=[] }){
    return fieldDetailsItem?.items && Object.keys(fieldDetailsItem.items).map((key) => {
        const subFieldDetailsItem = { 
            ...DEFAULT_FIELD_DETAILS_ITEM, 
            ...(fieldDetailsItem.items?.[key] ?? {}), 
            type: `${fieldDetailsItem.type}-item`,
        };
        return (
            <FormFieldLayout 
                key={key} 
                classNames={classNames} 
                name={name} 
                control={control} 
                fieldDetailsKey={key} 
                fieldDetailsItem={subFieldDetailsItem} 
                nest={[ ...nest, key ]}
            />
        )
    })
}

function FormItemLayout({ classNames, name, control, field, fieldDetailsKey="", fieldDetailsItem={}, nest=[] }){
    const classNameFormItem = cn(classNames?.formItem, fieldDetailsItem?.className, fieldDetailsItem?.classNames?.formItem);
    const classNameFormLabel = cn(classNames?.formLabel, fieldDetailsItem?.classNames?.formLabel);
    const classNameFormDescription = cn(classNames?.formDescription, fieldDetailsItem?.classNames?.formDescription);
    const classNameFormMessage = cn("text-center", classNames?.formMessage, fieldDetailsItem?.classNames?.formMessage);
    const classNameFormInputWrapper = cn(classNames?.formInputWrapper, fieldDetailsItem?.classNames?.formInputWrapper);
    const classNameFormInput = cn(classNames?.formInput, fieldDetailsItem?.classNames?.formInput);

    switch (fieldDetailsItem.type) {
        case "checkboxes": return (
            <FormItem className={classNameFormItem}>
                <div className={classNameFormInputWrapper}>
                    {fieldDetailsItem?.label && (
                        <FormLabel className={cn("text-base", classNameFormLabel)}>
                            {fieldDetailsItem.label}
                        </FormLabel>
                    )}
                    {fieldDetailsItem?.description && (
                        <FormDescription className={classNameFormDescription}>
                            {fieldDetailsItem.description}
                        </FormDescription>
                    )}
                </div>
                <SubFormItems 
                    classNames={classNames} 
                    name={name}
                    control={control} 
                    fieldDetailsKey={fieldDetailsKey} 
                    fieldDetailsItem={fieldDetailsItem} 
                    nest={nest}
                />
                <FormMessage className={classNameFormMessage}/>
            </FormItem>
        )
        case "checkboxes-item": return (
            <FormItem key={fieldDetailsKey} className={cn("flex flex-row items-center gap-2", classNameFormItem)}>
                <FormInput className={classNameFormInput} field={field} fieldDetailsKey={fieldDetailsKey} fieldDetailsItem={fieldDetailsItem} />
                {fieldDetailsItem?.label && (
                    <FormLabel className={cn("text-sm font-normal", classNameFormLabel)}>
                        {fieldDetailsItem.label}
                    </FormLabel>
                )}
            </FormItem>
        )
        case "toggle": return (
            <FormItem className={classNameFormItem}>
                <div className={cn("flex flex-row items-center gap-2", classNameFormInputWrapper)}>
                    <FormInput className={classNameFormInput} field={field} fieldDetailsKey={fieldDetailsKey} fieldDetailsItem={fieldDetailsItem} />
                    {fieldDetailsItem?.label && (
                        <FormLabel className={classNameFormLabel}>
                            {fieldDetailsItem.label}
                        </FormLabel>
                    )}
                </div>
                {fieldDetailsItem?.description && (
                    <FormDescription className={classNameFormDescription}>
                        {fieldDetailsItem.description}
                    </FormDescription>
                )}
                <FormMessage className={classNameFormMessage}/>
            </FormItem>
        )
        default: return (
            <FormItem className={classNameFormItem}>
                {fieldDetailsItem?.label && (
                    <FormLabel className={classNameFormLabel}>
                        {fieldDetailsItem.label}
                    </FormLabel>
                )}
                <FormInput className={classNameFormInput} field={field} fieldDetailsKey={fieldDetailsKey} fieldDetailsItem={fieldDetailsItem} />
                {fieldDetailsItem?.description && (
                    <FormDescription className={classNameFormDescription}>
                        {fieldDetailsItem.description}
                    </FormDescription>
                )}
                <FormMessage className={classNameFormMessage}/>
            </FormItem>
        )
    }
}

function FormFieldLayout({ classNames, name, control, fieldDetailsKey="", fieldDetailsItem={}, nest=[] }){
    switch (fieldDetailsItem.type) {
        default: return (
            <FormField
                name={name}
                control={control}
                render={({ field }) => (
                    <FormItemLayout 
                        classNames={classNames} 
                        name={name}
                        control={control}
                        field={field} 
                        fieldDetailsKey={fieldDetailsKey}
                        fieldDetailsItem={fieldDetailsItem}
                        nest={Array.isArray(nest) && nest.length > 0 ? nest : [ name ]}
                    />
                )}
            />
        )
    }
}





//______________________________________________________________________________________
// ===== Component =====

/**
 * 
 * @param {object} props
 * @param {string} [props.className]
 * @param {object} [props.classNames]
 * @param {string} [props.classNames.group]
 * @param {string} [props.classNames.formItem]
 * @param {string} [props.classNames.formLabel]
 * @param {string} [props.classNames.formDescription]
 * @param {string} [props.classNames.formInputWrapper]
 * @param {string} [props.classNames.formInput]
 * @param {string} [props.classNames.formMessage]
 * @param {string} [props.classNames.submitButton]
 * @param {string} [props.classNames.formRootMessage]
 * @param {ZodSchema} props.zodSchema
 * @param {object} [props.fieldDetails]
 * @param {function} props.onSubmitServer
 * @param {function} [props.onSubmitClient]
 * @param {object} [props.options]
 * @param {boolean} [props.options.debug]
 * @param {string | React.ReactNode} [props.options.submitText]
 * @param {string | React.ReactNode} [props.options.submittingText]
 * @param {object} [props.options.additionalData]
 * @param {object} [props.options.groupDetails]
 */
export default function InputOutputForm({ className, classNames, zodSchema, fieldDetails, onSubmitServer, onSubmitClient, options={} }) {

    //______________________________________________________________________________________
    // ===== Options =====
    const { debug, submitText, submittingText, additionalData, groupDetails, } = { ...DEFAULT_OPTIONS, ...options };



    //______________________________________________________________________________________
    // ===== Constants =====
    const keysToLoopOver = Object.keys({ ...fieldDetails });



    //______________________________________________________________________________________
    // ===== Hooks =====
    const form = useForm({
        resolver: zodResolver(zodSchema),
        defaultValues: getDefaultValues(fieldDetails),
    });



    //______________________________________________________________________________________
    // ===== State =====
    const [isSubmitting, setIsSubmitting] = useState(false)



    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        const callback = form.subscribe({
            formState: { values: true },
            callback: ({ values }) => {
                if(debug) console.log({ trace: "InputOutputForm useEffect", values });
                if(form?.formState?.errors?.root) form.setError("root", undefined);
            }
        })
        return () => callback();
    }, [form.subscribe])
    


    //______________________________________________________________________________________
    // ===== Functions =====

    const onSubmit = async (values) => {
        setIsSubmitting(true);
        const response = onSubmitServer 
            ? await onSubmitServer({ ...values, ...additionalData })
            : { error: true, message:"Dev Error: onSubmitServer not given to InputOutputForm" };

        if(onSubmitClient) onSubmitClient({ values, response });

        if(response?.error) form.setError(response?.data?.errorLocation ?? "root", { message: response?.message ?? "An unknown error occurred." });
        setIsSubmitting(false);
        form.reset();
    };
    


    //______________________________________________________________________________________
    // ===== Render Functions =====

    const renderFormFieldLayouts = (keys) => keys.map((key) => {
        const fieldDetailsItem = { ...DEFAULT_FIELD_DETAILS_ITEM, ...(fieldDetails?.[key] ?? {}) };
        return (
            <FormFieldLayout 
                key={key} 
                classNames={classNames} 
                name={key} 
                control={form.control} 
                fieldDetailsKey={key}
                fieldDetailsItem={fieldDetailsItem}
            />
        )
    })

    
    const renderGroup = (group, depth=0) => {
        let groupParts = [];
        Object.entries(group?.renders ?? {}).map(([key, groupDetailsObj]) => {
            if(groupDetailsObj?.isGroup) return groupParts.push(groupDetailsObj);
            if(groupDetailsObj?.isInputKey) {
                const mostRecentGroupParts = groupParts.length > 0 ? groupParts[groupParts.length - 1] : null;
                if(Array.isArray(mostRecentGroupParts)) {
                    groupParts[groupParts.length - 1].push(key);
                } else {
                    groupParts.push([ key ]);
                }
            }
        })
        
        return (
            <div key={depth} className={cn(classNames?.group, group?.className)}>
                {groupParts.map(keysOrGroup => {
                    if(keysOrGroup?.isGroup) return renderGroup(keysOrGroup, depth+1);
                    return renderFormFieldLayouts(keysOrGroup)
                })}
            </div>
        )
    }




    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-8", className)}>
                {groupDetails 
                    ? Object.entries(groupDetails).map(([key, groupDetailsObj]) => renderGroup(groupDetailsObj))
                    : renderFormFieldLayouts(keysToLoopOver)
                }
                <Button type="submit" className={cn("w-full", classNames?.submitButton)} disabled={isSubmitting}>
                    {isSubmitting ? submittingText : submitText}
                </Button>
                {form?.formState?.errors?.root?.message && (
                    <FormMessage className={cn("text-center", classNames?.formMessage, classNames?.formRootMessage)}>
                        {form.formState.errors.root.message}
                    </FormMessage>
                )}
            </form>
        </Form>
    );
}
