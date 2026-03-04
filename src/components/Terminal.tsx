"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TerminalHeader from "./TerminalHeader";
import BootSequence from "./BootSequence";
import AsciiArt from "./AsciiArt";
import CommandLine from "./CommandLine";
import CommandOutput from "./CommandOutput";
import SnakeGame from "./SnakeGame";
import ThemeSelector from "./ThemeSelector";
import MoreSelector from "./MoreSelector";
import LanguageSelector from "./LanguageSelector";
import ContactForm from "./ContactForm";
import { useTerminal } from "@/hooks/useTerminal";

const shortcuts = [
    { key: "1", label: "About", command: "/about" },
    { key: "2", label: "Projects", command: "/projects" },
    { key: "3", label: "Socials", command: "/socials" },
    { key: "4", label: "Help", command: "/help" },
];

export default function Terminal() {
    const router = useRouter();
    const { history, isBooting, processCommand, navigateHistory, finishBoot } =
        useTerminal();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showWelcome, setShowWelcome] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [gameMode, setGameMode] = useState<string | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
    const [isMoreSelectorOpen, setIsMoreSelectorOpen] = useState(false);
    const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    // Auto-scroll function
    const scrollToBottom = useCallback((smooth = false) => {
        if (!scrollRef.current) return;

        if (smooth) {
            setTimeout(() => {
                scrollRef.current?.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: "smooth",
                });
            }, 50);
            return;
        }

        // Follow the streaming cursor if it exists
        if (isStreaming) {
            const cursor = scrollRef.current.querySelector(".animate-blink");
            if (cursor) {
                cursor.scrollIntoView({ behavior: "auto", block: "nearest" });
            }
            // Do not fallback to scrollHeight while streaming
            return;
        }

        // Otherwise, jump to the end of the content
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [isStreaming]);

    // Lock body scroll on mobile (terminal page only)
    useEffect(() => {
        document.body.classList.add("terminal-lock");
        return () => {
            document.body.classList.remove("terminal-lock");
        };
    }, []);

    // Auto-scroll effect
    useEffect(() => {
        if (gameMode) return;

        // Scroll immediately on any state change
        scrollToBottom();

        // While streaming, continuously scroll to keep up with the expanding text
        let interval: ReturnType<typeof setInterval>;
        if (isStreaming) {
            interval = setInterval(scrollToBottom, 30);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [history, isBooting, showWelcome, gameMode, isStreaming, scrollToBottom]);

    const handleBootComplete = useCallback(() => {
        finishBoot();
        setTimeout(() => {
            setShowWelcome(true);
            // Auto-run /about on startup
            setTimeout(() => {
                setIsStreaming(true);
                processCommand("/about");
            }, 300);
        }, 200);
    }, [finishBoot, processCommand]);

    const handleCommand = useCallback(
        (input: string) => {
            let cmdStr = input.trim().toLowerCase();
            if (cmdStr.startsWith('/')) {
                cmdStr = cmdStr.slice(1);
            }
            const parts = cmdStr.split(/\s+/);
            const cmd = parts[0];
            const hasArgs = parts.length > 1;
            if (!cmd) return;

            // Intercept game commands
            if (cmd === "game") {
                setGameMode("game");
                return;
            }

            if (cmd === "gui") {
                router.push("/gui");
                return;
            }

            // Intercept theme — open selector only without args
            if (cmd === "theme") {
                if (hasArgs) {
                    setIsStreaming(true);
                    processCommand(input);
                } else {
                    setIsThemeSelectorOpen(true);
                    scrollToBottom(true);
                }
                return;
            }

            // Intercept language — open selector only without args
            if (cmd === "language") {
                if (hasArgs) {
                    setIsStreaming(true);
                    processCommand(input);
                } else {
                    setIsLanguageSelectorOpen(true);
                    scrollToBottom(true);
                }
                return;
            }

            // Intercept more options menu
            if (cmd === "more") {
                setIsMoreSelectorOpen(true);
                scrollToBottom(true);
                return;
            }

            // Intercept contact form
            if (cmd === "contact") {
                setIsContactFormOpen(true);
                scrollToBottom(true);
                return;
            }

            // 'clear' command doesn't generate output stream, just clears history
            if (cmd === "clear") {
                processCommand(input);
                processCommand("about");
                return;
            }

            setIsStreaming(true);
            processCommand(input);
        },
        [processCommand, router]
    );

    const handleShortcut = useCallback(
        (command: string) => {
            if (isStreaming) return;
            if (command === "/more") {
                setShowMoreMenu((prev) => !prev);
                return;
            }
            setShowMoreMenu(false);
            handleCommand(command);
        },
        [handleCommand, isStreaming]
    );

    const handleBodyClick = useCallback(() => {
        if (!gameMode) {
            const input = document.getElementById(
                "terminal-input"
            ) as HTMLInputElement;
            input?.focus();
        }
    }, [gameMode]);

    const toggleFullscreen = useCallback(() => {
        setIsFullscreen((prev) => !prev);
    }, []);

    const exitGame = useCallback(() => {
        setGameMode(null);
        // Refocus terminal input after exiting
        setTimeout(() => {
            const input = document.getElementById(
                "terminal-input"
            ) as HTMLInputElement;
            input?.focus();
        }, 100);
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
                    className={`terminal-window overflow-hidden flex flex-col ${isFullscreen
                        ? "rounded-none border-0 h-dvh"
                        : "rounded-none border-0 h-dvh md:rounded-xl md:border md:border-white/6 md:h-[80vh]"
                        }`}
                >
                    <TerminalHeader
                        isFullscreen={isFullscreen}
                        onToggleFullscreen={toggleFullscreen}
                    />

                    {/* Game Mode — takes over the entire body */}
                    {gameMode === "game" && (
                        <div className="flex-1 overflow-hidden bg-[#0A0A0A]">
                            <SnakeGame onExit={exitGame} />
                        </div>
                    )}

                    {/* Normal Terminal Mode */}
                    {!gameMode && (
                        <div
                            ref={scrollRef}
                            onClick={handleBodyClick}
                            className="terminal-body p-4 sm:p-6 overflow-y-auto font-mono text-sm cursor-text flex-1"
                        >
                            {/* Boot sequence */}
                            {isBooting && (
                                <BootSequence onComplete={handleBootComplete} />
                            )}

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
                                                disabled={isStreaming}
                                                className={`px-3 py-1.5 text-xs font-mono border border-accent/20 rounded-md
                                                 text-accent transition-all duration-200 ${isStreaming
                                                        ? "opacity-40 cursor-not-allowed"
                                                        : "hover:bg-accent/10 hover:border-accent/40 active:scale-95 cursor-pointer"
                                                    }`}
                                            >
                                                <span className="text-green">[{s.key}]</span>{" "}
                                                <span>{s.label}</span>
                                            </button>
                                        ))}

                                        {/* More Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => handleShortcut("/more")}
                                                disabled={isStreaming}
                                                className={`px-3 py-1.5 text-xs font-mono border border-accent/20 rounded-md
                                                 text-accent transition-all duration-200 ${isStreaming
                                                        ? "opacity-40 cursor-not-allowed"
                                                        : "hover:bg-accent/10 hover:border-accent/40 active:scale-95 cursor-pointer"
                                                    }`}
                                            >
                                                <span className="text-green">[5]</span>{" "}
                                                <span>More {showMoreMenu ? "▲" : "▼"}</span>
                                            </button>

                                            {showMoreMenu && (
                                                <div className="absolute top-full left-0 mt-2 bg-[#0A0A0A] border border-accent/20 rounded-md shadow-lg z-10 w-32 flex flex-col py-1">
                                                    <button
                                                        onClick={() => handleShortcut("/theme")}
                                                        className="px-4 py-2 text-xs font-mono text-left text-accent hover:bg-accent/10 transition-colors"
                                                    >
                                                        <span className="text-green">[t]</span> Theme
                                                    </button>
                                                    <button
                                                        onClick={() => handleShortcut("/game")}
                                                        className="px-4 py-2 text-xs font-mono text-left text-accent hover:bg-accent/10 transition-colors"
                                                    >
                                                        <span className="text-green">[g]</span> Game
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>

                                    <div className="border-t border-white/5 my-4" />

                                    {/* Command history */}
                                    <div className="space-y-3">
                                        {history.map((entry, index) => (
                                            <CommandOutput
                                                key={entry.id}
                                                entry={entry}
                                                isLatest={index === history.length - 1}
                                                onStreamComplete={() => setIsStreaming(false)}
                                            />
                                        ))}
                                    </div>

                                    {/* Active input or interactive prompts */}
                                    <div className="mt-3">
                                        {isThemeSelectorOpen ? (
                                            <ThemeSelector
                                                onSelect={(themeId) => {
                                                    setIsThemeSelectorOpen(false);
                                                    setIsStreaming(true);
                                                    processCommand(`/theme ${themeId}`);
                                                }}
                                                onCancel={() => {
                                                    setIsThemeSelectorOpen(false);
                                                }}
                                            />
                                        ) : isLanguageSelectorOpen ? (
                                            <LanguageSelector
                                                onSelect={(langId) => {
                                                    setIsLanguageSelectorOpen(false);
                                                    setIsStreaming(true);
                                                    processCommand(`/language ${langId}`);
                                                }}
                                                onCancel={() => {
                                                    setIsLanguageSelectorOpen(false);
                                                }}
                                            />
                                        ) : isMoreSelectorOpen ? (
                                            <MoreSelector
                                                onSelect={(selection) => {
                                                    setIsMoreSelectorOpen(false);
                                                    handleCommand(selection);
                                                }}
                                                onCancel={() => {
                                                    setIsMoreSelectorOpen(false);
                                                }}
                                            />
                                        ) : isContactFormOpen ? (
                                            <ContactForm
                                                onSubmit={() => {
                                                    setIsContactFormOpen(false);
                                                }}
                                                onCancel={() => {
                                                    setIsContactFormOpen(false);
                                                }}
                                            />
                                        ) : (
                                            <CommandLine
                                                onSubmit={handleCommand}
                                                onNavigate={navigateHistory}
                                                disabled={isStreaming}
                                            />
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
