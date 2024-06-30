import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-new-account";

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transcactions.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}