import { Project, SocialLink, Education, Experience } from "@/types/terminal";

export const profile = {
    name: "Dwi Fahmi",
    alias: "dwifahmi",
    title: "Software Engineer",
    bio: [
        "Passionate software engineer with a love for building elegant solutions.",
        "Experienced in full-stack development, mobile apps, and cloud infrastructure.",
        "Always exploring new technologies and pushing the boundaries of what's possible.",
    ],
    skills: [
        "TypeScript",
        "React / Next.js",
        "Flutter / Dart",
        "Node.js",
        "PostgreSQL",
        "Supabase",
        "Docker",
        "Git",
    ],
    location: "Indonesia",
    email: "hello@dwifahmi.dev",
};

export const projects: Project[] = [
    {
        slug: "terminal-portfolio",
        title: "Terminal Portfolio",
        description:
            "A CLI-style portfolio website built with Next.js 15 and Framer Motion. You're looking at it right now.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        images: ["/projects/terminal-portfolio.png", "/projects/task-manager.png", "/projects/mobile-banking.png", "/projects/ai-chatbot.png", "/projects/terminal-portfolio.png"],
        liveUrl: "https://dwifahmi.dev",
        repoUrl: "https://github.com/dwifahmi/portfolio",
    },
    {
        slug: "task-manager",
        title: "Task Manager Pro",
        description:
            "A full-stack task management app with real-time sync and team collaboration features.",
        techStack: ["React", "Node.js", "PostgreSQL", "WebSocket"],
        images: ["/projects/task-manager.png", "/projects/terminal-portfolio.png", "/projects/ai-chatbot.png", "/projects/mobile-banking.png", "/projects/task-manager.png"],
        repoUrl: "https://github.com/dwifahmi/task-manager",
    },
    {
        slug: "mobile-banking",
        title: "Mobile Banking App",
        description:
            "A secure mobile banking application with biometric auth and instant transfers.",
        techStack: ["Flutter", "Dart", "Firebase", "REST API"],
        images: ["/projects/mobile-banking.png", "/projects/ai-chatbot.png", "/projects/terminal-portfolio.png", "/projects/task-manager.png", "/projects/mobile-banking.png"],
    },
    {
        slug: "ai-chatbot",
        title: "AI Chatbot Platform",
        description:
            "An intelligent chatbot builder with NLP integration and analytics dashboard.",
        techStack: ["Python", "FastAPI", "React", "OpenAI"],
        images: ["/projects/ai-chatbot.png", "/projects/mobile-banking.png", "/projects/task-manager.png", "/projects/terminal-portfolio.png", "/projects/ai-chatbot.png"],
        repoUrl: "https://github.com/dwifahmi/chatbot",
        liveUrl: "https://chatbot.dwifahmi.dev",
    },
];

export const socials: SocialLink[] = [
    {
        name: "GitHub",
        url: "https://github.com/dwifahmi",
        icon: "◆",
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/dwifahmi",
        icon: "◇",
    },
    {
        name: "Twitter / X",
        url: "https://x.com/dwifahmi",
        icon: "✦",
    },
    {
        name: "Email",
        url: "mailto:hello@dwifahmi.dev",
        icon: "✉",
    },
];

export const education: Education[] = [
    {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        period: "2016 - 2020",
        description: "Graduated with honors. Focused on Software Engineering and Artificial Intelligence.",
    },
    {
        institution: "Tech Bootcamp",
        degree: "Full Stack Web Development Certification",
        period: "2020",
        description: "Intensive 12-week program learning modern web technologies like React and Node.js.",
    }
];

export const experience: Experience[] = [
    {
        company: "Tech Solutions Inc.",
        role: "Senior Software Engineer",
        period: "2023 - Present",
        description: "Leading a team of 5 developers to build scalable cloud applications using Next.js and Go.",
    },
    {
        company: "Creative Agency",
        role: "Full Stack Developer",
        period: "2020 - 2023",
        description: "Developed and maintained multiple client websites and web platforms, improving load times by 40%.",
    }
];

export const asciiArt = `
 ██████╗ ██╗    ██╗██╗    ███████╗ █████╗ ██╗  ██╗███╗   ███╗██╗
 ██╔══██╗██║    ██║██║    ██╔════╝██╔══██╗██║  ██║████╗ ████║██║
 ██║  ██║██║ █╗ ██║██║    █████╗  ███████║███████║██╔████╔██║██║
 ██║  ██║██║███╗██║██║    ██╔══╝  ██╔══██║██╔══██║██║╚██╔╝██║██║
 ██████╔╝╚███╔███╔╝██║    ██║     ██║  ██║██║  ██║██║ ╚═╝ ██║██║
 ╚═════╝  ╚══╝╚══╝ ╚═╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝
`;

export const bootMessages = [
    { text: "[OK] Initializing system...", delay: 0 },
];
