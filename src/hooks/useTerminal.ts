"use client";

import { useState, useCallback, ReactNode } from "react";
import { HistoryEntry } from "@/types/terminal";
import { executeCommand } from "@/lib/commands";

let idCounter = 0;
function generateId() {
    return `entry-${Date.now()}-${idCounter++}`;
}

export function useTerminal() {
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [inputHistory, setInputHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isBooting, setIsBooting] = useState(true);

    const addEntry = useCallback((input: string, output: ReactNode) => {
        const entry: HistoryEntry = {
            id: generateId(),
            input,
            output,
            timestamp: Date.now(),
        };
        setHistory((prev) => [...prev, entry]);
    }, []);

    const processCommand = useCallback(
        (input: string) => {
            const trimmed = input.trim();
            if (!trimmed) return;

            // Track input history for arrow navigation
            setInputHistory((prev) => [...prev, trimmed]);
            setHistoryIndex(-1);

            // Handle clear
            if (trimmed.toLowerCase() === "clear" || trimmed.toLowerCase() === "/clear") {
                setHistory([]);
                return;
            }

            const output = executeCommand(trimmed);
            addEntry(trimmed, output);
        },
        [addEntry]
    );

    const navigateHistory = useCallback(
        (direction: "up" | "down"): string => {
            if (inputHistory.length === 0) return "";

            let newIndex: number;
            if (direction === "up") {
                newIndex =
                    historyIndex === -1
                        ? inputHistory.length - 1
                        : Math.max(0, historyIndex - 1);
            } else {
                newIndex =
                    historyIndex === -1
                        ? -1
                        : historyIndex >= inputHistory.length - 1
                            ? -1
                            : historyIndex + 1;
            }

            setHistoryIndex(newIndex);
            return newIndex === -1 ? "" : inputHistory[newIndex];
        },
        [inputHistory, historyIndex]
    );

    const finishBoot = useCallback(() => {
        setIsBooting(false);
    }, []);

    return {
        history,
        isBooting,
        processCommand,
        navigateHistory,
        finishBoot,
    };
}
