import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useOpenCategory } from "../hooks/use-open-category";
import { useGetCategory } from "../api/use-get-category";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export const EditCategorySheet = () => {
    const { isOpen, onClose, id } = useOpenCategory();

    const [ConfirmDialog, confirm] = useConfirm("Delete Category", "Are you sure you want to delete this category?");

    const categoryQuery = useGetCategory(id);
    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isPending = editMutation.isPending || deleteMutation.isPending;

    const isLoading = categoryQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    }

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    }

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name
    } : {
        name: "" 
    }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Edit Category
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing category.
                    </SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <div className="absolute insert-0 flex items-center">
                        <Loader2 className="animate-spin text-muted-foreground" />
                    </div> 
                ) : (
                    <CategoryForm id={id} onSubmit={onSubmit} disabled={isPending} 
                    defaultValue={defaultValues} onDelete={onDelete} />
                )}
            </SheetContent>
        </Sheet>
        </>
    );
}