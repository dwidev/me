"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageLightboxProps {
    images: string[];
    currentIndex: number;
    alt: string;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

function ImageLightbox({
    images,
    currentIndex,
    alt,
    onClose,
    onNext,
    onPrev,
}: ImageLightboxProps) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            } else if (e.key === "ArrowRight" || e.key === "d") {
                e.preventDefault();
                e.stopPropagation();
                onNext();
            } else if (e.key === "ArrowLeft" || e.key === "a") {
                e.preventDefault();
                e.stopPropagation();
                onPrev();
            }
        };
        window.addEventListener("keydown", handleKey, true);
        return () => window.removeEventListener("keydown", handleKey, true);
    }, [onClose, onNext, onPrev]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
        >
            {/* Prev button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full
                 bg-white/5 border border-white/10 text-muted hover:text-white hover:bg-white/10
                 flex items-center justify-center text-lg transition-all cursor-pointer"
            >
                ‹
            </button>

            {/* Next button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full
                 bg-white/5 border border-white/10 text-muted hover:text-white hover:bg-white/10
                 flex items-center justify-center text-lg transition-all cursor-pointer"
            >
                ›
            </button>

            <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-[85vw] max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={alt}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                    />
                </AnimatePresence>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#1a1a1a] border border-white/10
                   text-muted hover:text-error hover:border-error/30
                   flex items-center justify-center text-xs transition-colors cursor-pointer"
                >
                    ✕
                </button>

                {/* Counter + hint */}
                <div className="flex items-center justify-center gap-3 mt-3">
                    <p className="text-muted text-[11px]">
                        <span className="text-accent font-bold">{currentIndex + 1}</span>
                        <span className="text-muted/50"> / </span>
                        <span className="text-muted">{images.length}</span>
                    </p>
                    <span className="text-muted/30 text-[10px]">·</span>
                    <p className="text-muted text-[10px]">
                        <span className="text-accent">←</span>{" "}
                        <span className="text-accent">→</span> navigate
                        {" · "}
                        <span className="text-accent">ESC</span> close
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}

interface ProjectImagesProps {
    images: string[];
    alt: string;
    liveUrl?: string;
}

export default function ProjectImages({ images, alt, liveUrl }: ProjectImagesProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxIndex(null);
    }, []);

    const goNext = useCallback(() => {
        setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % images.length : null
        );
    }, [images.length]);

    const goPrev = useCallback(() => {
        setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + images.length) % images.length : null
        );
    }, [images.length]);

    return (
        <>
            <div className="flex gap-2">
                {images.map((src, i) => (
                    <div key={i} className="relative group w-32 sm:w-40 aspect-video shrink-0">
                        <button
                            onClick={() => openLightbox(i)}
                            className="w-full h-full rounded-lg overflow-hidden transition-all cursor-pointer border border-white/10"
                        >
                            <img
                                src={src}
                                alt={`${alt} preview ${i + 1}`}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center rounded-lg pointer-events-none">
                                <span className="text-white/80 group-hover:text-white text-lg group-hover:scale-110 transition-transform">
                                    🔍
                                </span>
                            </div>
                        </button>
                        {liveUrl && (
                            <a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute -top-2 -right-2 w-7 h-7 bg-accent text-[#0A0A0A] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10 opacity-0 group-hover:opacity-100"
                                title="Open Live Project"
                            >
                                ↗
                            </a>
                        )}
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {lightboxIndex !== null && (
                    <ImageLightbox
                        images={images}
                        currentIndex={lightboxIndex}
                        alt={alt}
                        onClose={closeLightbox}
                        onNext={goNext}
                        onPrev={goPrev}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
