"use client";

// Types ---------------------------------------------------------------------------
import type { Resolver, SubmitHandler } from "react-hook-form";
// Packages ------------------------------------------------------------------------
import { z, ZodType, type input, type output } from "zod/v4";
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
// Data ----------------------------------------------------------------------------
// Other ---------------------------------------------------------------------------


// const formSchema = z.object({
//     username: z.string().min(2, {
//         message: "Username must be at least 2 characters.",
//     }),
// });

// formSchema.shape.username


//______________________________________________________________________________________
// ===== Component =====

export default function InputOutputForm<TSchema extends ZodType<any, any, any>>({ formSchema }: { formSchema: TSchema }) {

    const form = useForm<output<TSchema>>({
        resolver: zodResolver(formSchema) as unknown as Resolver<output<TSchema>, any, output<TSchema>>,
    });

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(values);
        } catch (error) {
            form.setError("root", {
                message: "This email is already taken",
            });
        }
    };

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
