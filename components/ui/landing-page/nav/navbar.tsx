import { NavLink } from "@/lib/constants/nav-links";
import Link from "next/link";
import { HeroNavBtns } from "./heronavbtns"
import { MobileNavBtn } from "./mobilenavbtn"

export function Navbar({ navLinks }: { navLinks: NavLink[]}){
    return (
        <div
            className="w-screen">
            <div
                className="fixed bg-background top-0 z-50 w-full max-w-[calc(100vw-15px)] flex items-center justify-between border-b border-b-foreground/10 h-16 shadow-xl md:py-3 md:px-5">
                <nav
                    className="w-[var(--content-width)] mx-auto max-md:hidden">
                    <div className="flex justify-between items-center text-sm">
                        <Link href={"/"} className="logo text-primary max-md:hidden">Titan Elite Fitness</Link>
                        <div
                            className="hidden xl:flex md:gap-8 md:items-center">
                            {navLinks.map((link) => (
                                <Link href={`/${link.href}`} key={link.href} className="logo transition-colors text-foreground hover:text-foreground-hover">{link.name}</Link>
                            ))}
                        </div>
                        <div
                            className="hidden md:flex xl:gap-8 items-center">
                            <HeroNavBtns />
                        </div>
                    </div>
                </nav>
                <nav
                    className="xl:hidden max-md:w-full h-full flex justify-between items-center">
                    <MobileNavBtn />
                </nav>
            </div>
        </div>
    )
}