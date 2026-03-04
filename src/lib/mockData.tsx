import { ReactNode } from "react";
import { Project, SocialLink, Education, Experience } from "@/types/terminal";
import { FiGithub, FiLinkedin, FiTwitter, FiAtSign, FiMail } from "react-icons/fi";

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
        slug: "ams",
        title: "AMS by Tokio Marine ID",
        description:
            "AMS stands for Activity Management System, an application used by agents at Tokio Marine Indonesia to assist in managing the mandate process for customers interested in insurance products, from data entry to data approval.",
        techStack: ["Flutter", "Dart", "Firebase", "Provider", "REST", "gRPC", "Clean Architecture"],
        images: ["/projects/ams.png"],
    },
    {
        slug: "superman-app",
        title: "SuperMan APP",
        description:
            "The Superman App is an application designed to assist in the management and validation process of items needed in the construction of Telkom towers or poles. This application can help manage inventory items, verify the quality of items, and ensure the availability of necessary items for the construction project.",
        techStack: ["Flutter", "Dart", "Firebase", "GetX", "REST", "GetX Architecture"],
        images: ["/projects/superman-app.png"],
    },
    {
        slug: "fund-group",
        title: "Fundrising - Group",
        description:
            "This fundraising group is an application for making donations that provides merchant vouchers if there are users who make a donation.",
        techStack: ["Flutter", "Dart", "Firebase", "Bloc", "REST", "Bloc Architecture"],
        images: ["/projects/fund-group.png"],
    },
    {
        slug: "fund-supporter",
        title: "Fundrising - Supporter",
        description:
            "Fundraising Supporter is an application used to redeem vouchers after users make a donation on a fundraising campaign website.",
        techStack: ["Flutter", "Dart", "Firebase", "Bloc", "REST", "Bloc Architecture"],
        images: ["/projects/fund-supporter.png"],
    },
    {
        slug: "cscom-web",
        title: "Career Support - Company Website",
        description:
            "Career Support Company is an website portal that can help companies publish job vacancies and find the best candidates for their company. This application is connected to a candidate portal.",
        techStack: ["Vue JS"],
        images: ["/projects/cscom-web.png"],
    },
    {
        slug: "csc",
        title: "Career Support - Candidate",
        description:
            "Career Support Candidate is an application aimed to assist students or the general public in finding job vacancies. This application is also connected to corporate and school portals to provide better support.",
        techStack: ["Flutter"],
        images: ["/projects/csc.png"],
    },
    {
        slug: "csm",
        title: "Career Support - Company",
        description:
            "Career Support Company is an application that can help companies publish job vacancies and find the best candidates for their company. This application is connected to a candidate portal.",
        techStack: ["Flutter", "Dart", "Firebase", "Bloc", "REST", "Bloc Architecture"],
        images: ["/projects/csm.png"],
    },
    {
        slug: "cscan-web",
        title: "Career Support - Candidate Website",
        description:
            "Career Support Candidate is an website portal aimed to assist students or the general public in finding job vacancies. This application is also connected to corporate and school portals to provide better support.",
        techStack: ["Vue JS"],
        images: ["/projects/cscan-web.png"],
    },
    {
        slug: "css-web",
        title: "Career Support - School Website",
        description:
            "\"Career Support School Website\" is a career center portal for schools/universities that manages student/alumni data to be channeled to companies as career support.",
        techStack: ["Vue JS"],
        images: ["/projects/css-web.png"],
    },
    {
        slug: "contest-sponsor",
        title: "Contest APP",
        description:
            "Contest app allows users to create and distribute prizes to a wider audience, with two roles: followers/participants and sponsors. It aims to facilitate and expand prize sharing within the community.",
        techStack: ["Flutter", "Dart", "Firebase", "Bloc", "REST", "Bloc Architecture"],
        images: ["/projects/contest-sponsor.png"],
    }
];

export const socials: SocialLink[] = [
    {
        name: "GitHub",
        url: "https://github.com/dwidev",
        icon: <FiGithub />,
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/fahmi-dwi-syahputra-995994130/",
        icon: <FiLinkedin />,
    },
    {
        name: "Twitter / X",
        url: "https://x.com/dwifhmi",
        icon: <FiTwitter />,
    },
    {
        name: "Thread",
        url: "https://www.threads.com/@dwifhmi",
        icon: <FiAtSign />,
    },
    {
        name: "Email",
        url: "mailto:fahmidwi45@gmail.com",
        icon: <FiMail />,
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
