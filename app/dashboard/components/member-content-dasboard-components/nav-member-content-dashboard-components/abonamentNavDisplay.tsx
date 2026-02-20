export async function AbonamentNavDisplay({ subscription }: { subscription: string }) {
    return <p className="font-body text-sm font-semibold text-primary-foreground">Abonament: <span className="text-accent underline underline-offset-4">{subscription}</span></p>
}