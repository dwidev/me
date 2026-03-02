"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface ContactFormProps {
    onSubmit: () => void;
    onCancel: () => void;
}

export default function ContactForm({ onSubmit, onCancel }: ContactFormProps) {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [currentInput, setCurrentInput] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
    const inputRef = useRef<any>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [step, status]);

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            if (step === 2 && e.shiftKey) {
                // Allow Shift+Enter to create a new line in textarea
                return;
            }
            e.preventDefault();
            const val = currentInput.trim();
            if (!val) return;

            if (step === 0) {
                setEmail(val);
                setStep(1);
                setCurrentInput("");
            } else if (step === 1) {
                setSubject(val);
                setStep(2);
                setCurrentInput("");
            } else if (step === 2) {
                setMessage(val);
                setStep(3);
                setCurrentInput("");
                submitForm(email, subject, val);
            }
        } else if (e.key === "Escape") {
            e.preventDefault();
            onCancel();
        }
    };

    const submitForm = (e: string, s: string, m: string) => {
        setStatus("sending");
        // Simulate sending process
        setTimeout(() => {
            setStatus("done");
            setTimeout(() => {
                onSubmit();
            }, 2000); // 2 second success message before returning to normal terminal
        }, 1500);
    };

    const prompts = [
        "Your email: ",
        "Subject: ",
        "Message: "
    ];

    if (status === "done") {
        return (
            <div className="mt-2 text-green font-mono text-sm py-2">
                [Success] Message sent successfully! I will get back to you shortly.
            </div>
        );
    }

    if (status === "sending") {
        return (
            <div className="mt-2 text-accent font-mono text-sm py-2 animate-pulse">
                Sending message...
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-sm space-y-2 mt-2 mb-4"
        >
            <p className="text-accent font-bold">Contact Me (ESC to cancel)</p>
            <p className="text-muted text-xs mb-3">
                Have a project in mind or want to collaborate? Let&apos;s talk!
            </p>

            {step > 0 && (
                <div className="flex gap-2">
                    <span className="text-green w-32 shrink-0">Your email:</span>
                    <span className="text-text">{email}</span>
                </div>
            )}
            {step > 1 && (
                <div className="flex gap-2">
                    <span className="text-green w-32 shrink-0">Subject:</span>
                    <span className="text-text">{subject}</span>
                </div>
            )}

            <div className={`flex gap-2 font-mono text-sm cursor-text group ${step === 2 ? 'items-start mt-1' : 'items-center'}`} onClick={() => inputRef.current?.focus()}>
                <span className={`text-green w-24 sm:w-32 shrink-0 ${step === 2 ? 'mt-0.5' : ''}`}>{prompts[step]}</span>
                {step === 2 ? (
                    <textarea
                        ref={inputRef}
                        value={currentInput}
                        onChange={(e) => {
                            setCurrentInput(e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-text outline-none caret-accent placeholder:text-muted/40 resize-none overflow-hidden"
                        rows={1}
                        placeholder="Type here... (Shift + Enter for new line)"
                    />
                ) : (
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-text outline-none caret-accent placeholder:text-muted/40"
                        placeholder="Type here..."
                    />
                )}
                {/* Mobile submit button */}
                {currentInput.trim() && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            const val = currentInput.trim();
                            if (!val) return;
                            if (step === 0) {
                                setEmail(val);
                                setStep(1);
                                setCurrentInput("");
                            } else if (step === 1) {
                                setSubject(val);
                                setStep(2);
                                setCurrentInput("");
                            } else if (step === 2) {
                                setMessage(val);
                                setStep(3);
                                setCurrentInput("");
                                submitForm(email, subject, val);
                            }
                        }}
                        className="shrink-0 px-2 py-1 text-xs font-mono text-accent border border-accent/30 rounded active:scale-95 transition-all sm:hidden cursor-pointer"
                    >
                        ↵
                    </button>
                )}
            </div>

            {/* Mobile cancel button */}
            <button
                onClick={onCancel}
                className="mt-3 px-3 py-1.5 text-xs font-mono text-error border border-error/30 rounded active:scale-95 transition-all sm:hidden cursor-pointer"
            >
                Cancel (ESC)
            </button>
        </motion.div>
    );
}
