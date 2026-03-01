"use client";

import { useEffect, useRef, useState, ReactNode, useCallback } from "react";

interface StreamingOutputProps {
    children: ReactNode;
    /** Speed in ms per character */
    speed?: number;
    /** Called when streaming finishes */
    onComplete?: () => void;
}

export default function StreamingOutput({
    children,
    speed = 10,
    onComplete,
}: StreamingOutputProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState<"hidden" | "streaming" | "done">("hidden");
    const initRef = useRef(false);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    const startStreaming = useCallback(() => {
        const container = containerRef.current;
        if (!container || initRef.current) return;
        initRef.current = true;

        // Build ordered list of reveal items: text nodes + non-text elements
        type RevealItem =
            | { kind: "text"; node: Text; original: string }
            | { kind: "element"; node: HTMLElement };

        const items: RevealItem[] = [];

        function walk(parent: Node) {
            for (let i = 0; i < parent.childNodes.length; i++) {
                const child = parent.childNodes[i];

                if (child.nodeType === Node.TEXT_NODE) {
                    const text = child.textContent || "";
                    if (text.length > 0) {
                        items.push({ kind: "text", node: child as Text, original: text });
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const el = child as HTMLElement;
                    const tag = el.tagName.toLowerCase();

                    // Leaf visuals — img, canvas, svg, video, button
                    if (["img", "canvas", "svg", "video"].includes(tag)) {
                        items.push({ kind: "element", node: el });
                    } else if (tag === "button" && !el.innerText?.trim()) {
                        // Visual-only buttons (like image thumbnails)
                        items.push({ kind: "element", node: el });
                    } else {
                        walk(el);
                    }
                }
            }
        }

        walk(container);

        if (items.length === 0) {
            setPhase("done");
            return;
        }

        // Compute cost per item and hide everything
        const costs: number[] = items.map((item) => {
            if (item.kind === "text") {
                item.node.textContent = "";
                return item.original.length;
            } else {
                item.node.style.display = "none";
                return 1; // non-text counts as 1 step
            }
        });

        const totalCost = costs.reduce((a, b) => a + b, 0);
        const charsPerTick = totalCost > 500 ? 5 : totalCost > 200 ? 3 : 1;

        setPhase("streaming");

        // Create a moving DOM cursor
        const cursorEl = document.createElement("span");
        cursorEl.className = "animate-blink text-accent inline";
        cursorEl.textContent = "▍";

        let revealed = 0;
        const timer = setInterval(() => {
            revealed += charsPerTick;

            let lastNode: Node | null = null;
            let budget = revealed;

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const cost = costs[i];
                if (budget <= 0) break;

                if (item.kind === "text") {
                    if (budget >= cost) {
                        item.node.textContent = item.original;
                        budget -= cost;
                    } else {
                        item.node.textContent = item.original.slice(0, budget);
                        budget = 0;
                    }
                    lastNode = item.node;
                } else {
                    if (budget >= cost) {
                        item.node.style.display = "";
                        budget -= cost;
                    }
                    lastNode = item.node;
                }
            }

            // Move the cursor directly after the last active node
            if (lastNode && lastNode.parentNode) {
                if (lastNode.nextSibling !== cursorEl) {
                    lastNode.parentNode.insertBefore(cursorEl, lastNode.nextSibling);
                }
            }

            if (revealed >= totalCost) {
                clearInterval(timer);
                if (cursorEl.parentNode) {
                    cursorEl.parentNode.removeChild(cursorEl);
                }
                // Restore everything
                items.forEach((item) => {
                    if (item.kind === "text") {
                        item.node.textContent = item.original;
                    } else {
                        item.node.style.display = "";
                    }
                });
                setPhase("done");
                onCompleteRef.current?.();
            }
        }, speed);

        return () => clearInterval(timer);
    }, [speed]);

    // Wait for children to render, then start streaming
    useEffect(() => {
        // Use double rAF to ensure React has flushed and browser has painted
        const raf1 = requestAnimationFrame(() => {
            const raf2 = requestAnimationFrame(() => {
                startStreaming();
            });
            return () => cancelAnimationFrame(raf2);
        });
        return () => cancelAnimationFrame(raf1);
    }, [startStreaming]);

    return (
        <div className="relative inline">
            <div
                ref={containerRef}
                style={phase === "hidden" ? { visibility: "hidden", height: 0, overflow: "hidden" } : undefined}
            >
                {children}
            </div>
        </div>
    );
}
