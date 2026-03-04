"use client";

import { motion } from "framer-motion";
import { FiLayout } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface TerminalHeaderProps {
    title?: string;
    isFullscreen: boolean;
    onToggleFullscreen: () => void;
}

export default function TerminalHeader({
    title = "dwifahmi@portfolio: ~",
    isFullscreen,
    onToggleFullscreen,
}: TerminalHeaderProps) {
    const router = useRouter();

    return (
        <div
            className={`flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-white/5 select-none ${isFullscreen ? "" : "rounded-t-xl"
                }`}
        >
            {/* Traffic light dots */}
            <div className="flex gap-2">
                <motion.button
                    className="traffic-dot w-3 h-3 rounded-full bg-[#ff5f57] cursor-pointer border-0 p-0"
                    whileHover={{ scale: 1.2 }}
                    aria-label="Close"
                />
                <motion.button
                    className="traffic-dot w-3 h-3 rounded-full bg-[#febc2e] cursor-pointer border-0 p-0"
                    whileHover={{ scale: 1.2 }}
                    aria-label="Minimize"
                />
                <motion.button
                    className="traffic-dot w-3 h-3 rounded-full bg-[#28c840] cursor-pointer border-0 p-0"
                    whileHover={{ scale: 1.2 }}
                    onClick={onToggleFullscreen}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                />
            </div>

            {/* Title */}
            <div className="flex-1 text-center">
                <span className="text-muted text-xs font-mono">{title}</span>
            </div>

            {/* Spacer to center title */}
            <div className="w-[52px] flex justify-end">
                <button
                    onClick={() => router.push("/gui")}
                    className="text-muted hover:text-accent transition-colors p-1"
                    title="Switch to GUI Mode"
                >
                    <FiLayout size={16} />
                </button>
            </div>
        </div>
    );
}
