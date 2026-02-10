"use client"

import { useState } from "react";

export function ImagineEchipament({ src }: { src: string }){

    const [loaded, setLoaded] = useState(false);

    return (
         <div className="relative w-full h-full">
            {!loaded && (
                <div className="absolute inset-0 bg-neutral-300 animate-pulse rounded-sm" />
            )}

            <img
                src={src}
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                    loaded ? "opacity-100" : "opacity-0"
                }`}
                alt=""
            />
        </div>
    )
}