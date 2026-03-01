"use client";

import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
    text: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
}

export default function TypewriterText({
    text,
    speed = 20,
    className = "",
    onComplete,
}: TypewriterTextProps) {
    const [displayed, setDisplayed] = useState("");
    const [scope, animate] = useAnimate();

    useEffect(() => {
        let i = 0;
        setDisplayed("");

        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                onComplete?.();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onComplete]);

    useEffect(() => {
        if (scope.current) {
            animate(scope.current, { opacity: [0.5, 1] }, { duration: 0.1 });
        }
    }, [displayed, animate, scope]);

    return (
        <motion.span ref={scope} className={className}>
            {displayed}
            <span className="animate-blink text-accent">█</span>
        </motion.span>
    );
}
