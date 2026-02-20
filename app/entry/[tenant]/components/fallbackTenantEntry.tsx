import { LoadingSpinner } from "@/components/loadingSpinner";

export function FallbackTenantEntry() {
    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center gap-4">
            <LoadingSpinner width={32} />
            <p className="text-base text-primary-foreground">Se verifică validitatea intrării...</p>
        </div>
    )
}