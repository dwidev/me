"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { profile, projects, experience, socials } from "@/lib/mockData";
import { FiArrowLeft, FiMail, FiTerminal } from "react-icons/fi";
import { applyTheme } from "@/lib/themeUtils";
import { motion, AnimatePresence } from "framer-motion";
import { ImageLightbox } from "@/components/ProjectImages";

export default function GuiPortfolio() {
    const [mounted, setMounted] = useState(false);
    const [visibleProjects, setVisibleProjects] = useState(3);
    const [lightboxProject, setLightboxProject] = useState<{ slug: string, index: number } | null>(null);

    const activeProject = lightboxProject
        ? projects.find(p => p.slug === lightboxProject.slug)
        : null;

    // Enforce Light mode on mount
    useEffect(() => {
        setMounted(true);
        applyTheme("light");
    }, []);

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-bg text-text font-sans selection:bg-accent selection:text-bg transition-colors duration-300">
            {/* Minimalist Floating Nav */}
            <motion.nav
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-end items-center max-w-2xl mx-auto"
            >
                <Link href="/" className="group flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-surface border border-transparent hover:border-white/10 transition-all text-sm text-muted hover:text-text" onClick={() => applyTheme("dark")}>
                    <FiTerminal className="group-hover:-translate-x-0.5 transition-transform" />
                    <span>Terminal Mode</span>
                </Link>
            </motion.nav>

            <div className="max-w-2xl mx-auto px-6 pt-20 pb-24 space-y-10">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-8"
                >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-surface shadow-lg bg-surface flex items-center justify-center shrink-0 relative">
                        <Image
                            src="/photo/pp.jpeg"
                            alt={profile.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-2xl font-bold tracking-tight text-text">
                            {profile.name}
                        </h1>
                        <p className="text-base text-muted leading-relaxed max-w-xl">
                            {profile.bio.join(" ")}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <a
                            href={`mailto:${profile.email}`}
                            className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-white/5 border border-white/10 rounded-lg text-sm font-medium transition-all"
                        >
                            <FiMail />
                            <span>Get in touch</span>
                        </a>

                        <div className="flex gap-4 items-center text-muted">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent transition-colors p-2"
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Projects Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-4"
                >
                    <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
                    <div className="space-y-6">
                        {projects.slice(0, visibleProjects).map((project) => (
                            <div
                                key={project.slug}
                                className="group flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 hover:bg-surface p-3 -mx-3 rounded-lg transition-colors"
                            >
                                <div className="space-y-1 flex-1">
                                    <h3 className="font-medium text-text group-hover:text-green transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-muted line-clamp-2 pr-4">
                                        {project.description}
                                    </p>
                                    <div className="pt-2">
                                        <span className="text-xs font-mono text-muted opacity-80 px-2 py-0.5 rounded border border-muted/30">
                                            {project.techStack[0]}
                                        </span>
                                    </div>
                                </div>

                                {project.images && project.images.length > 0 && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setLightboxProject({ slug: project.slug, index: 0 });
                                        }}
                                        className="shrink-0 relative w-full sm:w-32 h-48 sm:h-20 rounded-md overflow-hidden bg-surface border border-black/5 mt-2 sm:mt-0 cursor-pointer block group/img"
                                        aria-label={"Preview images for " + project.title}
                                    >
                                        <Image
                                            src={project.images[0]}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                            <span className="text-white text-xl scale-90 group-hover/img:scale-100 transition-transform">
                                                🔍
                                            </span>
                                        </div>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {visibleProjects < projects.length && (
                        <div className="pt-4 flex justify-center">
                            <button
                                onClick={() => setVisibleProjects(prev => prev + 5)}
                                className="px-6 py-2 text-sm font-medium border border-surface bg-surface hover:bg-neutral-200 text-text rounded-full transition-colors focus:ring-2 focus:ring-accent"
                            >
                                Load More Projects
                            </button>
                        </div>
                    )}
                </motion.section>

                {/* Experience Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-8"
                >
                    <h2 className="text-lg font-semibold tracking-tight">Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp, i) => (
                            <div key={i} className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-8 group hover:bg-surface p-3 -mx-3 rounded-lg transition-colors">
                                <div className="space-y-1">
                                    <h3 className="font-medium text-text">
                                        {exp.company}
                                    </h3>
                                    <p className="text-sm text-muted">
                                        {exp.role}
                                    </p>
                                </div>
                                <span className="text-sm text-muted whitespace-nowrap pt-0.5 opacity-60">
                                    {exp.period.split(" - ")[0]} &mdash; {exp.period.split(" - ")[1]}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.section>

                <footer className="pt-8 border-t border-surface text-sm text-muted text-center pb-8">
                    &copy; {new Date().getFullYear()} {profile.name}.
                </footer>
            </div>

            <AnimatePresence>
                {lightboxProject && activeProject && activeProject.images && (
                    <ImageLightbox
                        images={activeProject.images}
                        currentIndex={lightboxProject.index}
                        alt={activeProject.title}
                        onClose={() => setLightboxProject(null)}
                        onNext={() => setLightboxProject(prev => prev ? { ...prev, index: (prev.index + 1) % activeProject.images!.length } : null)}
                        onPrev={() => setLightboxProject(prev => prev ? { ...prev, index: (prev.index - 1 + activeProject.images!.length) % activeProject.images!.length } : null)}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
