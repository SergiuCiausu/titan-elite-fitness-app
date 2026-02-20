"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export function ClientMembersInGymCount({ initialMembersCount } : { initialMembersCount: number }) {

    const [membersCount, setMembersCount] = useState(initialMembersCount);
    const [statusColor, setStatusColor] = useState<"positive" | "neutral" | "negative">("positive");
    
    const supabase = createClient();

    const fetchActiveCount = async () => {
        const { data, error } = await supabase
            .from("Entries")
            .select("id")
            .eq("status", "active");

        if (!error) {
            setMembersCount(data.length);
            switch (true) {
                case data.length > 80:
                    setStatusColor("negative")
                case data.length > 40:
                    setStatusColor("neutral")
                default:
                    setStatusColor("positive")
            }
        }
    };

   useEffect(() => {

    fetchActiveCount();

    const intervalId = setInterval(() => {
      fetchActiveCount();
    }, 15000);

    return () => clearInterval(intervalId);
}, []);

    return (
        <div
            className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `var(--${statusColor})` }}></div>
            <p className="text-primary-foreground text-sm font-body font-semibold">{membersCount} membri în sală</p>
        </div>
    )
}