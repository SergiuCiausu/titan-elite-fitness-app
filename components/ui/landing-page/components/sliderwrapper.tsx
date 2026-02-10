"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "../components/sectionheader";
import { useEffect, useState, Children, ReactNode, useMemo } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

interface SliderWrapperProps {
    children: ReactNode; 
    title: string;
}

export function SliderWrapper({ children, title }: SliderWrapperProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const x = useMotionValue(0);

    const childrenArray = Children.toArray(children);
    const itemCount = childrenArray.length;

    useEffect(() => {
        setIsMounted(true);
        setWindowWidth(window.innerWidth);

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { subtract, step } = useMemo(() => {
        if (windowWidth <= 630) return { subtract: 2, step: 204 };
        if (windowWidth <= 1280) return { subtract: 5, step: 204 };
        if (windowWidth <= 1567) return { subtract: 4, step: 304 };
        if (windowWidth <= 1867) return { subtract: 5, step: 304 };
        if (windowWidth <= 1920) return { subtract: 6, step: 304 };
        return { subtract: 6, step: 404 };
    }, [windowWidth]);

    const gap = 20;
    const controlStep = step + gap;
    const totalTrackWidth = (itemCount * step) + ((itemCount - 1) * gap);
    const maxScroll = Math.max(0, totalTrackWidth - windowWidth);

    const shiftTo = (index: number) => {
        const totalPossibleSteps = itemCount - subtract;
        const targetIndex = Math.max(0, Math.min(index, totalPossibleSteps));
        
        const isAtEnd = targetIndex >= totalPossibleSteps;
        const targetX = isAtEnd ? -maxScroll : -(targetIndex * controlStep);

        animate(x, targetX, {
            type: "spring",
            stiffness: 300,
            damping: 30,
        });
        setCurrentIndex(targetIndex);
    };

    useEffect(() => {
        const isAtEnd = currentIndex >= itemCount - subtract;
        const targetX = isAtEnd ? -maxScroll : -(currentIndex * controlStep);
        
        x.set(targetX);
    }, [windowWidth, subtract, maxScroll, controlStep]);

    if (!isMounted) return <div className="h-[400px] w-full" />

    return (
        <section className="w-full flex flex-col gap-16">
            <SectionHeader text={title} />
            
            <div className="w-full relative overflow-hidden">
                <div className={`${childrenArray.length > 6 ? "" : "hidden"} w-full h-full absolute top-0 left-0 z-30 pointer-events-none bg-[image:var(--slider-gradient)]`} />

                {currentIndex > 0 && (
                    <button onClick={() => shiftTo(currentIndex - 1)} className="w-10 h-10 absolute top-1/2 -translate-y-1/2 left-16 bg-accent z-40 rounded-2xl text-background flex items-center justify-center cursor-pointer">
                        <ChevronLeft strokeWidth={3}/>
                    </button>
                )}
                
                {currentIndex < itemCount - subtract && (
                    <button onClick={() => shiftTo(currentIndex + 1)} className="w-10 h-10 absolute top-1/2 -translate-y-1/2 right-16 bg-accent z-40 rounded-2xl text-background flex items-center justify-center cursor-pointer">
                        <ChevronRight strokeWidth={3}/>
                    </button>
                )}

                <motion.div
                    drag="x"
                    dragConstraints={{ left: -maxScroll, right: 0 }}
                    dragElastic={0.1}
                    style={{ x }}
                    className="w-fit flex gap-5 items-center cursor-grab active:cursor-grabbing"
                    onDragEnd={() => {
                        const currentX = x.get();
                        const calculatedIndex = Math.round(Math.min(Math.abs(currentX) / controlStep, itemCount - subtract));
                        shiftTo(calculatedIndex);
                    }}
                >
                    {Children.map(children, (child, i) => (
                        <div key={i} className="flex-none select-none max-xl:w-[204px] w-[304px] 3xl:w-[404px] pointer-events-none">
                            {child}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}