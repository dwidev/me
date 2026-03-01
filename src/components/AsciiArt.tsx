"use client";

import { motion } from "framer-motion";
import { asciiArt } from "@/lib/mockData";

export default function AsciiArt() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="my-4"
        >
            <pre className="text-accent text-[0.5rem] sm:text-[0.6rem] md:text-xs leading-tight font-mono whitespace-pre overflow-x-auto">
                {asciiArt}
            </pre>
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-2 space-y-1"
            >
                <p className="text-text text-sm">
                    Welcome to my terminal portfolio.{" "}
                    <span className="text-muted">Type a command or click a shortcut.</span>
                </p>
            </motion.div>
        </motion.div>
    );
}
