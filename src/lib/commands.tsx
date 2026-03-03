"use client";

import React, { useEffect, useState } from "react";
import { CommandHandler } from "@/types/terminal";
import { profile, projects, socials, education, experience } from "@/lib/mockData";
import ProjectImages from "@/components/ProjectImages";

function HelpOutput() {
    const commands = [
        { cmd: "/help", desc: "Show available commands" },
        { cmd: "/about", desc: "Learn about me" },
        { cmd: "/whoami", desc: "Display user identity" },
        { cmd: "/projects", desc: "View my projects" },
        { cmd: "/ls", desc: "Alias for projects" },
        { cmd: "/socials", desc: "Find me online" },
        { cmd: "/education", desc: "View my educational background" },
        { cmd: "/experience", desc: "View my work experience" },
        { cmd: "/contact", desc: "Send me a message" },
        { cmd: "/more", desc: "Show more options" },
        { cmd: "/clear", desc: "Clear the terminal" },
    ];

    return (
        <div className="space-y-1">
            <p className="text-accent font-bold mb-2">Available Commands:</p>
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
                {commands.map((c) => (
                    <React.Fragment key={c.cmd}>
                        <span className="text-green">{c.cmd}</span>
                        <span className="text-muted">{c.desc}</span>
                    </React.Fragment>
                ))}
            </div>
            <p className="text-muted mt-3 text-sm">
                Tip: Click the shortcuts above or type a command below.
            </p>
        </div>
    );
}

function AboutOutput() {
    return (
        <div className="space-y-3">
            <p className="text-accent font-bold text-lg">{profile.name}</p>
            <p className="text-green">{profile.title}</p>
            <div className="space-y-1">
                {profile.bio.map((line, i) => (
                    <p key={i} className="text-text">
                        {line}
                    </p>
                ))}
            </div>
            <div className="mt-3">
                <p className="text-accent font-bold mb-1">Skills:</p>
                <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-2 py-0.5 text-xs border border-accent/30 rounded text-accent bg-accent/5"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-2 text-muted text-sm">
                <p>📍 {profile.location}</p>
                <p>✉ {profile.email}</p>
            </div>
        </div>
    );
}

function WhoamiOutput() {
    return (
        <div>
            <p className="text-green">
                {profile.alias}@portfolio <span className="text-muted">—</span>{" "}
                <span className="text-text">{profile.name}</span>
            </p>
            <p className="text-muted text-sm mt-1">{profile.title}</p>
        </div>
    );
}

function ProjectsOutput() {
    return (
        <div className="space-y-5">
            <p className="text-accent font-bold">
                Projects ({projects.length} total):
            </p>
            {projects.map((project) => (
                <div key={project.slug} className="pl-1 space-y-2">
                    <p className="text-green font-bold">{project.title}</p>
                    <p className="text-text text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-1.5 py-0.5 text-xs bg-green/10 text-green rounded"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-4 mt-1">
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent text-xs hover:underline"
                            >
                                → repo
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent text-xs hover:underline"
                            >
                                → live
                            </a>
                        )}
                    </div>
                    {project.images && project.images.length > 0 && (
                        <ProjectImages images={project.images} alt={project.title} />
                    )}
                </div>
            ))}
        </div>
    );
}

function SocialsOutput() {
    return (
        <div className="space-y-2">
            <p className="text-accent font-bold">Find me online:</p>
            {socials.map((social) => (
                <div key={social.name} className="flex items-center gap-3">
                    <span className="text-green w-4 text-center">{social.icon}</span>
                    <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                    >
                        {social.name}
                    </a>
                    <span className="text-muted text-xs">{social.url}</span>
                </div>
            ))}
        </div>
    );
}

function EducationOutput() {
    return (
        <div className="space-y-4">
            <p className="text-accent font-bold">Education History:</p>
            {education.map((edu, i) => (
                <div key={i} className="pl-1 border-l-2 border-white/10 space-y-1 py-1">
                    <p className="text-green font-bold text-sm">{edu.institution}</p>
                    <p className="text-accent text-xs">{edu.degree}</p>
                    <p className="text-muted text-[11px] font-mono">{edu.period}</p>
                    <p className="text-text text-sm mt-1">{edu.description}</p>
                </div>
            ))}
        </div>
    );
}

function ExperienceOutput() {
    return (
        <div className="space-y-4">
            <p className="text-accent font-bold">Work Experience:</p>
            {experience.map((exp, i) => (
                <div key={i} className="pl-1 border-l-2 border-white/10 space-y-1 py-1">
                    <p className="text-green font-bold text-sm">{exp.role}</p>
                    <p className="text-accent text-xs">{exp.company}</p>
                    <p className="text-muted text-[11px] font-mono">{exp.period}</p>
                    <p className="text-text text-sm mt-1">{exp.description}</p>
                </div>
            ))}
        </div>
    );
}

function ErrorOutput({ input }: { input: string }) {
    return (
        <div>
            <p className="text-error">
                zsh: command not found: {input}.{" "}
                <span className="text-muted">
                    Did you mean &apos;<span className="text-green">/help</span>&apos;?
                </span>
            </p>
        </div>
    );
}

const availableThemes = ["dark", "light", "dracula", "hacker", "retro", "monochrome"];

function ThemeOutput({ args }: { args: string[] }) {
    const [status, setStatus] = useState<"processing" | "success" | "invalid">("processing");
    const themeTarget = args[0]?.toLowerCase();

    useEffect(() => {
        if (!themeTarget) {
            setStatus("invalid");
            return;
        }

        if (availableThemes.includes(themeTarget)) {
            // Apply theme
            const root = document.documentElement;
            // Remove previous theme classes
            root.classList.forEach((cls) => {
                if (cls.startsWith("theme-")) {
                    root.classList.remove(cls);
                }
            });
            // Default "dark" means no extra class needed
            if (themeTarget !== "dark") {
                root.classList.add(`theme-${themeTarget}`);
            }
            localStorage.setItem("portfolio-theme", themeTarget);
            setStatus("success");
        } else {
            setStatus("invalid");
        }
    }, [themeTarget]);

    if (status === "processing") return null;

    if (!themeTarget) {
        return (
            <div className="space-y-2">
                <p className="text-accent font-bold">Usage: /theme [name]</p>
                <div className="space-y-1">
                    <p className="text-muted">Available themes:</p>
                    <div className="flex flex-wrap gap-3">
                        {availableThemes.map((t) => (
                            <span key={t} className="text-green">{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (status === "invalid") {
        return (
            <div>
                <p className="text-error">Unknown theme: {themeTarget}</p>
                <p className="text-muted">Available themes: {availableThemes.join(", ")}</p>
            </div>
        );
    }

    return (
        <div>
            <p className="text-green">
                Theme successfully changed to: <span className="text-accent">{themeTarget}</span>
            </p>
        </div>
    );
}

const availableLanguages = ["en", "id", "jp"];

function LanguageOutput({ args }: { args: string[] }) {
    const [status, setStatus] = useState<"processing" | "success" | "invalid">("processing");
    const langTarget = args[0]?.toLowerCase();

    useEffect(() => {
        if (!langTarget) {
            setStatus("invalid");
            return;
        }

        if (availableLanguages.includes(langTarget)) {
            // Here you could trigger i18n changes, right now just updating localstorage
            localStorage.setItem("portfolio-lang", langTarget);
            setStatus("success");
        } else {
            setStatus("invalid");
        }
    }, [langTarget]);

    if (status === "processing") return null;

    if (!langTarget) {
        return (
            <div className="space-y-2">
                <p className="text-accent font-bold">Usage: /language [code]</p>
                <div className="space-y-1">
                    <p className="text-muted">Available languages:</p>
                    <div className="flex flex-wrap gap-3">
                        {availableLanguages.map((t) => (
                            <span key={t} className="text-green">{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (status === "invalid") {
        return (
            <div>
                <p className="text-error">Unknown language: {langTarget}</p>
                <p className="text-muted">Available languages: {availableLanguages.join(", ")}</p>
            </div>
        );
    }

    return (
        <div>
            <p className="text-green">
                Language successfully changed to: <span className="text-accent">{langTarget}</span>
            </p>
        </div>
    );
}

export const commandRegistry: Record<string, CommandHandler> = {
    help: {
        description: "Show available commands",
        handler: () => <HelpOutput />,
    },
    about: {
        description: "Learn about me",
        handler: () => <AboutOutput />,
    },
    whoami: {
        description: "Display user identity",
        handler: () => <WhoamiOutput />,
    },
    projects: {
        description: "View my projects",
        handler: () => <ProjectsOutput />,
    },
    ls: {
        description: "Alias for projects",
        handler: () => <ProjectsOutput />,
    },
    socials: {
        description: "Find me online",
        handler: () => <SocialsOutput />,
    },
    education: {
        description: "View my educational background",
        handler: () => <EducationOutput />,
    },
    experience: {
        description: "View my work experience",
        handler: () => <ExperienceOutput />,
    },
    theme: {
        description: "Change terminal theme",
        handler: (args) => <ThemeOutput args={args} />,
    },
    language: {
        description: "Change terminal language",
        handler: (args) => <LanguageOutput args={args} />,
    },
    game: {
        description: "Play the game 🐍",
        handler: () => null, // Intercepted by Terminal for fullscreen mode
    },
    more: {
        description: "Show more options",
        handler: () => null, // Intercepted by Terminal for interactive menu
    },
    contact: {
        description: "Send me a message",
        handler: () => null, // Intercepted by Terminal for contact form
    },
    clear: {
        description: "Clear the terminal",
        handler: () => null,
    },
};

export function getCommandSuggestions(
    partial: string
): { command: string; description: string }[] {
    const trimmed = partial.trim().toLowerCase();

    // Auto-suggest only appears if input begins with '/'
    if (!trimmed.startsWith("/")) return [];

    const search = trimmed.slice(1);
    const hiddenCommands = ["theme", "language", "game"];

    const allCommands = Object.entries(commandRegistry)
        .filter(([cmd]) => !hiddenCommands.includes(cmd))
        .map(([cmd, handler]) => ({
            command: `/${cmd}`,
            description: handler.description,
        }));

    if (!search) {
        return allCommands;
    }

    // Prefix matches first, then includes matches
    const prefixMatches = allCommands.filter(
        (c) => c.command.slice(1).startsWith(search) && c.command.slice(1) !== search
    );
    const includesMatches = allCommands.filter(
        (c) =>
            c.command.slice(1).includes(search) &&
            !c.command.slice(1).startsWith(search) &&
            c.command.slice(1) !== search
    );

    return [...prefixMatches, ...includesMatches];
}

export function executeCommand(input: string): React.ReactNode {
    let trimmed = input.trim().toLowerCase();
    if (!trimmed) return null;

    if (trimmed.startsWith('/')) {
        trimmed = trimmed.slice(1).trim();
    }

    const [cmd, ...args] = trimmed.split(/\s+/);
    const handler = commandRegistry[cmd];

    if (handler) {
        return handler.handler(args);
    }

    return <ErrorOutput input={input.trim()} />;
}
