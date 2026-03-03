import { Project, SocialLink, Education, Experience } from "@/types/terminal";

export const profile = {
    name: "Fahmi Dwi Syahputra",
    alias: "dwifahmi",
    title: "Software Engineer",
    bio: [
        "Passionate software engineer with a love for building elegant solutions.",
        "Experienced in frontend development, web development and mobile apps.",
        "Always exploring new technologies and improving my skills.",
    ],
    skills: [
        "TypeScript",
        "JavaScript",
        "React / Next.js",
        "Vue JS",
        "Flutter / Dart",
        "Node.js",
        "Golang",
        "PostgreSQL",
        "Supabase",
        "Docker",
        "Git",
    ],
    location: "Bogor, Indonesia",
    email: "fahmidwi45@gmail.com",
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
        repoUrl: "https://github.com/dwidev/me",
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
        url: "https://github.com/dwidev",
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
        url: "mailto:fahmidwi45@gmail.com",
        icon: "✉",
    },
];

export const education: Education[] = [
    {
        institution: "SMK Adi Sanggoro",
        degree: "Software Engineering (Rekayasa Perangkat Lunak)",
        period: "2012 - 2015",
        description: "Activities and Societies: Multimedia Adi Sanggoro.",
    }
];

export const experience: Experience[] = [
    {
        company: "Tokio Marine Life Insurance Indonesia",
        role: "Flutter Developer",
        period: "Mar 2021 - Present",
        description: "Designed and developed Flutter applications using Clean Architecture. Used Provider for efficient state management. Integrated REST APIs and gRPC for real-time data sync and batch processing. Created intuitive, responsive UIs focused on UX.",
    },
    {
        company: "Frisidea Tech",
        role: "Frontend Developer",
        period: "Nov 2019 - Present",
        description: "Served as a Frontend Developer, maintaining and building various frontend web applications.",
    },
    {
        company: "KDPMS",
        role: "Web Developer",
        period: "Aug 2018 - Nov 2019",
        description: "Created a web application to streamline customer management for account officers. Included tracking submissions, income monitoring, and reporting using PHP (CodeIgniter 3), MySQL, and customized jQuery SPAs.",
    },
    {
        company: "Freelance",
        role: "Web Developer",
        period: "Jan 2018 - Aug 2019",
        description: "Created various custom web portals for clients as an independent freelancer.",
    },
    {
        company: "Dinas Komunikasi dan Informatika",
        role: "Web Developer",
        period: "Aug 2017 - Oct 2017",
        description: "Developed official government website portals and services at jdih.kotabogor.go.id.",
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
