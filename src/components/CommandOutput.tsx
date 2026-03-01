"use client";

import { motion } from "framer-motion";
import { HistoryEntry } from "@/types/terminal";

interface CommandOutputProps {
    entry: HistoryEntry;
}

export default function CommandOutput({ entry }: CommandOutputProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-2"
        >
            {/* Echo the input */}
            <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-green shrink-0 select-none">
                    <span className="text-accent">user</span>
                    <span className="text-muted">@</span>
                    <span className="text-green">portfolio</span>
                    <span className="text-muted">:</span>
                    <span className="text-accent">~</span>
                    <span className="text-text">$</span>
                </span>
                <span className="text-text">{entry.input}</span>
            </div>

            {/* Command output */}
            {entry.output && (
                <div className="pl-0 font-mono text-sm ml-0 mt-1 mb-3">
                    {entry.output}
                </div>
            )}
        </motion.div>
    );
}
