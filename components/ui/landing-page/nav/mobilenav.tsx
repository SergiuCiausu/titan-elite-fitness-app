"use client";

import { NavLink } from "@/lib/constants/nav-links";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../button";

export function MobileNav({ navLinks } : { navLinks: NavLink[] }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-5 bg-background/90 z-0"
        >
            <div className="absolute w-full bg-background opacity-90 h-screen flex flex-col items-center justify-center top-0 left-0 gap-4">
                {navLinks.map(link => (
                    <Button variant={"no_bg"}>
                        <Link key={link.href} href={`/${link.href}`} className="text-foreground transition-colors duration-150 hover:text-foreground-hover">{link.name}</Link>
                    </Button>
                ))}
            </div>
        </motion.div>
    )
}