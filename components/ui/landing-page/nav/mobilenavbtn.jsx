"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MobileNav } from "./mobilenav";
import { navLinks } from "@/lib/constants/nav-links";

export function MobileNavBtn() {
  /* prettier-ignore */
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between relative z-10 py-3 px-5">
        <Link href={"/"} className="logo text-primary">
          Titan Elite Fitness
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>{isOpen ? <MobileNav navLinks={navLinks} /> : ""}</AnimatePresence>
    </div>
  );
}
