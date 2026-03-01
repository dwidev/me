"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalHeader from "./TerminalHeader";
import BootSequence from "./BootSequence";
import AsciiArt from "./AsciiArt";
import CommandLine from "./CommandLine";
import CommandOutput from "./CommandOutput";
import { useTerminal } from "@/hooks/useTerminal";

const shortcuts = [
    { key: "1", label: "About", command: "about" },
    { key: "2", label: "Projects", command: "projects" },
    { key: "3", label: "Socials", command: "socials" },
    { key: "4", label: "Help", command: "help" },
];

export default function Terminal() {
    const { history, isBooting, processCommand, navigateHistory, finishBoot } =
        useTerminal();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showWelcome, setShowWelcome] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isBooting, showWelcome]);

    const handleBootComplete = useCallback(() => {
        finishBoot();
        setTimeout(() => setShowWelcome(true), 200);
    }, [finishBoot]);

    const handleShortcut = useCallback(
        (command: string) => {
            processCommand(command);
        },
        [processCommand]
    );

    const handleBodyClick = useCallback(() => {
        const input = document.getElementById("terminal-input") as HTMLInputElement;
        input?.focus();
    }, []);

    const toggleFullscreen = useCallback(() => {
        setIsFullscreen((prev) => !prev);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isFullscreen ? "fullscreen" : "windowed"}
                layout
                initial={false}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
                className={
                    isFullscreen
                        ? "fixed inset-0 z-50"
                        : "w-full max-w-4xl mx-auto"
                }
            >
                <motion.div
                    layout
                    transition={{
                        layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    }}
                    className={`terminal-window overflow-hidden h-full ${isFullscreen
                            ? "rounded-none border-0"
                            : "rounded-xl border border-white/[0.06]"
                        }`}
                >
                    <TerminalHeader
                        isFullscreen={isFullscreen}
                        onToggleFullscreen={toggleFullscreen}
                    />

                    <div
                        ref={scrollRef}
                        onClick={handleBodyClick}
                        className={`terminal-body p-4 sm:p-6 overflow-y-auto font-mono text-sm cursor-text ${isFullscreen
                                ? "h-[calc(100vh-44px)]"
                                : "min-h-[60vh] max-h-[80vh]"
                            }`}
                    >
                        {/* Boot sequence */}
                        {isBooting && <BootSequence onComplete={handleBootComplete} />}

                        {/* Welcome section */}
                        {!isBooting && showWelcome && (
                            <>
                                <AsciiArt />

                                {/* Shortcuts */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="flex flex-wrap gap-2 my-4"
                                >
                                    {shortcuts.map((s) => (
                                        <button
                                            key={s.key}
                                            onClick={() => handleShortcut(s.command)}
                                            className="px-3 py-1.5 text-xs font-mono border border-accent/20 rounded-md
                             text-accent hover:bg-accent/10 hover:border-accent/40
                             transition-all duration-200 active:scale-95 cursor-pointer"
                                        >
                                            <span className="text-green">[{s.key}]</span>{" "}
                                            <span>{s.label}</span>
                                        </button>
                                    ))}
                                </motion.div>

                                <div className="border-t border-white/5 my-4" />

                                {/* Command history */}
                                <div className="space-y-3">
                                    {history.map((entry) => (
                                        <CommandOutput key={entry.id} entry={entry} />
                                    ))}
                                </div>

                                {/* Active input */}
                                <div className="mt-3">
                                    <CommandLine
                                        onSubmit={processCommand}
                                        onNavigate={navigateHistory}
                                        disabled={false}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
