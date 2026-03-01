import { ReactNode } from "react";

export interface HistoryEntry {
    id: string;
    input: string;
    output: ReactNode;
    timestamp: number;
}

export interface CommandHandler {
    description: string;
    usage?: string;
    handler: (args: string[]) => ReactNode;
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    techStack: string[];
    image?: string;
    images?: string[];
    repoUrl?: string;
    liveUrl?: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}
