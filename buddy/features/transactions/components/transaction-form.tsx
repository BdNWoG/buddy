import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertTransactionSchema } from "@/db/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select } from "@/components/select";

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional(),
})

const apiSchema = insertTransactionSchema.omit({ id: true})

type FormValues = z.infer<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>

type Props = {
    id?: string;
    defaultValue?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: {label: string, value: string}[];
    categoryOptions: {label: string, value: string}[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({ 
    id, defaultValue, onSubmit, onDelete, disabled, accountOptions, categoryOptions, onCreateAccount, onCreateCategory
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValue,
    });

    const handleSubmit = (values: FormValues) => {
        console.log({ values })
        //onSubmit(values);
    }

    const handleDelete = () => {
        onDelete?.();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="pt-4 space-y-4">
                <FormField control={form.control} name="accountId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Account
                            </FormLabel>
                            <FormControl>
                                <Select options={accountOptions} placeholder="Select an account" 
                                onCreate={onCreateAccount} value={field.value} onChange={field.onChange}
                                disabled={disabled} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-full" disabled={disabled}>
                    {id ? "Save Changes" : "Create Transaction"}
                </Button>
                {!!id && (<Button type="button" disabled={disabled} onClick={handleDelete} className="w-full" variant="outline">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Transaction
                </Button>)}
            </form>
        </Form>
    );
}