"use client";

import { motion } from "framer-motion";
import { HistoryEntry } from "@/types/terminal";
import StreamingOutput from "./StreamingOutput";

interface CommandOutputProps {
    entry: HistoryEntry;
    isLatest?: boolean;
    onStreamComplete?: () => void;
}

export default function CommandOutput({ entry, isLatest, onStreamComplete }: CommandOutputProps) {
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
                    <span className="text-accent">root</span>
                    <span className="text-muted">@</span>
                    <span className="text-green">dwifahmi</span>
                    <span className="text-muted">:</span>
                    <span className="text-accent">~</span>
                    <span className="text-text">$</span>
                </span>
                <span className="text-text">{entry.input}</span>
            </div>

            {/* Command output with streaming animation */}
            {entry.output && (
                <div className="pl-0 font-mono text-sm ml-0 mt-1 mb-3">
                    <StreamingOutput
                        speed={5}
                        onComplete={isLatest ? onStreamComplete : undefined}
                    >
                        {entry.output}
                    </StreamingOutput>
                </div>
            )}
        </motion.div>
    );
}
