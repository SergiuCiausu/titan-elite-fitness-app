import Link from "next/link";
import { Button } from "../../button";
import { HeaderHr } from "../../headerhr";

type FooterHref = {
    text: string,
    href: string,
}

type FooterLink = {
    col: string,
    hrefs: FooterHref[]
}

export function Footer() {

    const links: FooterLink[] = [
        {
            col: "Informații",
            hrefs: [
                {
                    text: "Galerie foto",
                    href: "/galerie-foto"
                },
                {
                    text: "Locații",
                    href: "/locatii"
                },
                {
                    text: "Antrenori",
                    href: "/antrenori"
                },
                {
                    text: "Clase",
                    href: "/clase"
                },
                {
                    text: "Aparate",
                    href: "/aparate"
                },
                {
                    text: "Abonamente",
                    href: "/abonamente"
                },
                {
                    text: "Cariere",
                    href: "/cariere"
                },
                {
                    text: "Contact",
                    href: "/contact"
                },
            ]
        },
        {
            col: "Regulamente",
            hrefs: [
                {
                    text: "Regulament intern de funcționare",
                    href: "/regulamente/regulament-intern-de-functionare"
                },
                {
                    text: "Regulament pentru zonele clubului",
                    href: "/regulamente/regulament-pentru-zonele-clubului"
                },
                {
                    text: "Regulament privind accesul minorilor",
                    href: "/regulamente/regulament-privind-accesul-minorilor"
                },
                {
                    text: "Regulament pentru rezervările la clasele de fitness",
                    href: "/regulamente/regulament-pentru-rezervarile-la-clasele-de-fitness"
                },
                {
                    text: "Regulament privind înghețarea abonamentelor",
                    href: "/regulamente/regulament-privind-inghetarea-abonamentelor"
                },
                {
                    text: "Regulament privind înghețarea abonamentelor",
                    href: "/regulamente/regulament-privind-inghetarea-abonamentelor"
                },
            ]
        },
        {
            col: "Pagini utile",
            hrefs: [
                {
                    text: "Regulament anulare abonament",
                    href: "/regulamente/regulament-anulare-abonament"
                },
                {
                    text: "Termeni și condiții",
                    href: "/regulamente/termeni-si-conditii"
                },
                {
                    text: "Politica de confidențialitate",
                    href: "/regulamente/politica-de-confidentialitate"
                },
                {
                    text: "Politica de cookies",
                    href: "/regulamente/politica-de-cookies"
                },
                {
                    text: "Prelucrarea datelor cu caracter personal GDPR",
                    href: "/regulamente/prelucrarea-datelor-cu-caracter-personal-gdpr"
                },
            ]
        }
    ]

    return (
        <div
            className="bg-footer w-full py-16">
                <div
                    className="w-[var(--content-width)] flex gap-5 mx-auto">
                        <div
                            className="flex-1 flex justify-between">
                                {links.map((link, index) => (
                                    <div
                                        key={`footer-link-${index}`}
                                        className="flex flex-col gap-4">
                                            <div
                                                className="flex flex-col gap-1">
                                                <p className="text-secondary-foreground text-xl uppercase" style={{ fontFamily: "var(--header-font)"}}>{link.col}</p>
                                                <HeaderHr size="sm" color="accent" />
                                            </div>
                                            <div
                                                className="flex flex-col gap-1">
                                                    {link.hrefs.map((href, index) => (
                                                        <Link key={`${href.text}-${index}`} href={href.href} className="font-body text-sm text-secondary-foreground !font-normal no-underline underline-offset-2 hover:underline ">{href.text}</Link>
                                                    ))}
                                            </div>
                                    </div>
                                ))}
                        </div>
                        <div
                            className="w-[304px] flex flex-col gap-4">
                            <Button
                                variant="custom"
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-2xl py-4 w-full">
                                Cumpără abonament
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-2xl py-4 !w-full">
                                Contactează antrenor
                            </Button>
                        </div>
                </div>
        </div>
    )
}