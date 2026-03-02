"use client";

import { useState, useRef, useEffect, useMemo, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCommandSuggestions } from "@/lib/commands";

interface CommandLineProps {
    onSubmit: (input: string) => void;
    onNavigate: (direction: "up" | "down") => string;
    disabled?: boolean;
}

export default function CommandLine({
    onSubmit,
    onNavigate,
    disabled = false,
}: CommandLineProps) {
    const [input, setInput] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const suggestions = useMemo(() => {
        if (!showSuggestions) return [];
        return getCommandSuggestions(input);
    }, [input, showSuggestions]);

    // Ghost text: show the top suggestion's remaining characters inline
    const ghostText = useMemo(() => {
        if (suggestions.length === 0 || !input.trim()) return "";
        const top = suggestions[selectedIndex]?.command ?? "";
        const trimmed = input.trim().toLowerCase();
        if (top.startsWith(trimmed)) {
            return top.slice(trimmed.length);
        }
        return "";
    }, [suggestions, input, selectedIndex]);

    // Reset selected index when suggestions change
    useEffect(() => {
        setSelectedIndex(0);
    }, [suggestions.length]);

    useEffect(() => {
        if (!disabled) {
            inputRef.current?.focus();
        }
    }, [disabled]);

    const acceptSuggestion = (command: string) => {
        setInput(command);
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const command =
                suggestions.length > 0
                    ? suggestions[selectedIndex].command
                    : input.trim();
            if (command) {
                onSubmit(command);
                setInput("");
                setShowSuggestions(true);
                setSelectedIndex(0);
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            if (suggestions.length > 0) {
                acceptSuggestion(suggestions[selectedIndex].command);
            }
        } else if (e.key === "ArrowUp") {
            if (suggestions.length > 0) {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev <= 0 ? suggestions.length - 1 : prev - 1
                );
            } else {
                e.preventDefault();
                const prev = onNavigate("up");
                setInput(prev);
                setShowSuggestions(false);
            }
        } else if (e.key === "ArrowDown") {
            if (suggestions.length > 0) {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev >= suggestions.length - 1 ? 0 : prev + 1
                );
            } else {
                e.preventDefault();
                const next = onNavigate("down");
                setInput(next);
                setShowSuggestions(false);
            }
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        } else {
            // Re-enable suggestions when user types
            if (!showSuggestions) setShowSuggestions(true);
        }
    };

    const handleChange = (value: string) => {
        setInput(value);
        if (!showSuggestions) setShowSuggestions(true);
    };

    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="relative">
            <div
                className="flex items-center gap-2 font-mono text-sm cursor-text group"
                onClick={handleContainerClick}
            >
                <span className="text-green shrink-0 select-none">
                    <span className="text-accent">root</span>
                    <span className="text-muted">@</span>
                    <span className="text-green">dwifahmi</span>
                    <span className="text-muted">:</span>
                    <span className="text-accent">~</span>
                    <span className="text-text">$</span>
                </span>
                <div className="flex-1 relative">
                    {/* Ghost/inline suggestion text */}
                    {ghostText && (
                        <span className="absolute inset-0 pointer-events-none font-mono text-sm flex items-center">
                            <span className="invisible">{input}</span>
                            <span className="text-muted/30">{ghostText}</span>
                        </span>
                    )}
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                        className="w-full bg-transparent text-text outline-none caret-accent font-mono text-sm placeholder:text-muted/40 relative z-10"
                        placeholder={disabled ? "" : "Type a command..."}
                        id="terminal-input"
                    />
                </div>
            </div>

            {/* Suggestions dropdown */}
            <AnimatePresence>
                {suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="mt-1 ml-[calc(1ch)] border border-white/[0.08] rounded-md bg-[#141414] overflow-hidden shadow-lg shadow-black/30"
                    >
                        {suggestions.map((s, i) => (
                            <button
                                key={s.command}
                                onClick={() => acceptSuggestion(s.command)}
                                className={`w-full flex items-center gap-3 px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer border-0 text-left ${i === selectedIndex
                                    ? "bg-accent/10 text-accent"
                                    : "text-text hover:bg-white/[0.04]"
                                    }`}
                            >
                                <span
                                    className={`shrink-0 ${i === selectedIndex ? "text-accent" : "text-green"
                                        }`}
                                >
                                    {s.command}
                                </span>
                                <span className="text-muted text-[11px]">{s.description}</span>
                                {i === selectedIndex && (
                                    <span className="ml-auto text-muted/40 text-[10px] shrink-0">
                                        TAB ↵
                                    </span>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
