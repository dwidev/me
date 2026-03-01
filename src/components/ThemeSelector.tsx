"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const themes = [
    { id: "dark", label: "Dark (Default)" },
    { id: "light", label: "Light" },
    { id: "dracula", label: "Dracula" },
    { id: "hacker", label: "Hacker" },
    { id: "retro", label: "Retro" },
];

interface ThemeSelectorProps {
    onSelect: (themeId: string) => void;
    onCancel: () => void;
}

export default function ThemeSelector({ onSelect, onCancel }: ThemeSelectorProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "ArrowUp" || e.key === "k") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : themes.length - 1));
            } else if (e.key === "ArrowDown" || e.key === "j") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev < themes.length - 1 ? prev + 1 : 0));
            } else if (e.key === "Enter") {
                e.preventDefault();
                const selected = themes[selectedIndex];
                onSelect(selected.id);
            } else if (e.key === "Escape") {
                e.preventDefault();
                onCancel();
            }
        },
        [selectedIndex, onSelect, onCancel]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown, true);
        return () => window.removeEventListener("keydown", handleKeyDown, true);
    }, [handleKeyDown]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-sm space-y-2 mt-2 mb-4"
        >
            <div className="flex gap-2">
                <span className="text-green select-none">
                    <span className="text-accent">root</span>
                    <span className="text-muted">@</span>
                    <span className="text-green">dwifahmi</span>
                    <span className="text-muted">:</span>
                    <span className="text-accent">~</span>
                    <span className="text-text">$</span>
                </span>
                <span className="text-text">theme</span>
            </div>

            <p className="text-accent font-bold mt-2">Select a theme (Tap/Click an option or use arrow keys + Enter):</p>
            <div className="space-y-1 ml-2">
                {themes.map((theme, i) => (
                    <div
                        key={theme.id}
                        className={`flex items-center gap-3 py-1 cursor-pointer select-none transition-colors ${i === selectedIndex ? "text-green font-bold" : "text-muted hover:text-text/70"
                            }`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedIndex(i);
                            onSelect(theme.id);
                        }}
                    >
                        <span className="w-4 text-center">
                            {i === selectedIndex ? "❯" : ""}
                        </span>
                        <span>{theme.label}</span>
                    </div>
                ))}
            </div>
            <div className="mt-2 text-xs text-muted">
                Tip: You can also quick-set a theme by typing `theme hacker`
            </div>
        </motion.div>
    );
}
