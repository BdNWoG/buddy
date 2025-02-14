import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { insertTransactionSchema } from "@/db/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select } from "@/components/select";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/amount-input";
import { convertAmountToMiliunits } from "@/lib/utils";

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
    defaultValues?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: {label: string, value: string}[];
    categoryOptions: {label: string, value: string}[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({ 
    id, defaultValues, onSubmit, onDelete, disabled, accountOptions, categoryOptions, onCreateAccount, onCreateCategory
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        const amount = parseFloat(values.amount);
        const amountInMiliunits = convertAmountToMiliunits(amount);

        onSubmit({
            ...values,
            amount: amountInMiliunits
        });
    }

    const handleDelete = () => {
        onDelete?.();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="pt-4 space-y-4">
                <FormField control={form.control} name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <DatePicker value={field.value} onChange={field.onChange} disabled={disabled} />
                            </FormControl>
                        </FormItem>
                    )}
                />
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
                <FormField control={form.control} name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Category
                            </FormLabel>
                            <FormControl>
                                <Select options={categoryOptions} placeholder="Select a category"  
                                onCreate={onCreateCategory} value={field.value} onChange={field.onChange}
                                disabled={disabled} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField control={form.control} name="payee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Payee
                            </FormLabel>
                            <FormControl>
                                <Input disabled={disabled} {...field} placeholder="e.g. Amazon, Uber, ..." />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField control={form.control} name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Amount
                            </FormLabel>
                            <FormControl>
                                <AmountInput {...field} disabled={disabled} placeholder="0.00" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField control={form.control} name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Notes
                            </FormLabel>
                            <FormControl>
                                <Textarea {...field} value={field.value ?? ""} disabled={disabled} placeholder="Optional Notes" />
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