"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

export default function EntryConfirmationLayout() {
  const [showCheck, setShowCheck] = useState(false);
  const [circleComplete, setCircleComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCheck(true);
      setCircleComplete(true);
    }, 100);
    
    const redirectTimer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      {/* Confetti */}
      {circleComplete && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Circle and Check */}
      <svg className="w-32 h-32">
        {/* Circle background */}
        <circle
          cx="50%"
          cy="50%"
          r="50"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        {/* Animated stroke */}
        <circle
          cx="50%"
          cy="50%"
          r="50"
          stroke="#10b981"
          strokeWidth="8"
          fill="none"
          strokeDasharray={2 * Math.PI * 50}
          strokeDashoffset={circleComplete ? 0 : 2 * Math.PI * 50}
          style={{
            transition: "stroke-dashoffset 1s ease-out",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
        {/* Check Icon */}
        {showCheck && (
          <foreignObject x="25" y="25" width="100" height="100">
            <div className="flex items-center justify-center w-20 h-20">
              <Check size={64} strokeWidth={4} color="#10b981" className="animate-scale-in" />
            </div>
          </foreignObject>
        )}
      </svg>

      <h1 className="mt-4 text-4xl font-bold font-header text-primary-foreground">
        Succes!
      </h1>
    </div>
  );
}