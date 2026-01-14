import { NavLink } from "@/lib/constants/nav-links";
import Link from "next/link";
import { HeroNavBtns } from "./heronavbtns"
import { MobileNavBtn } from "./mobilenavbtn"

export function Navbar({ navLinks }: { navLinks: NavLink[]}){
    return (
        <div
            className="fixed bg-background top-0 z-10 w-full flex items-center justify-between border-b border-b-foreground/10 h-16 shadow-xl md:py-3 md:px-5">
            <nav
                className="w-[var(--content-width)] mx-auto max-md:hidden">
                <div className="flex justify-between items-center text-sm">
                    <Link href={"/"} className="logo text-primary">Titan Elite Fitness</Link>
                    <div
                        className="hidden md:flex md:gap-8 md:items-center">
                        {navLinks.map((link) => (
                            <Link href={`/${link.href}`} key={link.href} className="logo transition-colors text-foreground hover:text-foreground-hover">{link.name}</Link>
                        ))}
                    </div>
                    <div
                        className="hidden md:flex gap-8 items-center">
                        <HeroNavBtns />
                    </div>
                </div>
            </nav>
            <nav
                className="md:hidden w-full flex justify-between items-center">
                <MobileNavBtn />
            </nav>
        </div>
    
    )
}