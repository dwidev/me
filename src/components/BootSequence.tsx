"use client";

import { motion } from "framer-motion";
import { bootMessages } from "@/lib/mockData";
import { useEffect } from "react";

interface BootSequenceProps {
    onComplete: () => void;
}

const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const lineVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.2,
            ease: "easeOut" as const,
        },
    },
};

export default function BootSequence({ onComplete }: BootSequenceProps) {
    useEffect(() => {
        const totalDuration = bootMessages.length * 150 + 800;
        const timer = setTimeout(onComplete, totalDuration);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1 font-mono text-sm"
        >
            {bootMessages.map((msg, i) => (
                <motion.div key={i} variants={lineVariants} className="flex gap-2">
                    <span className="text-green">{msg.text.slice(0, 4)}</span>
                    <span className="text-text">{msg.text.slice(5)}</span>
                </motion.div>
            ))}
            <motion.div
                variants={lineVariants}
                className="mt-3 text-accent font-bold"
            >
                ═══════════════════════════════════════════
            </motion.div>
        </motion.div>
    );
}
