export const navItems = [
    { name: "Home", link: "#hero", icon: "/images/home.png" },
    { name: "Skills", link: "#skills", icon: "/images/skills.png" },
    { name: "Experience", link: "#experience", icon: "/images/experience.png" },
    { name: "Projects", link: "#projects", icon: "/images/project.png" },
    { name: "Certificates", link: "#cert", icon: "/images/cert.png" },
    { name: "Contact", link: "#contact", icon: "/images/contact.png" },
    { name: "Resume", link: "https://drive.google.com/file/d/199b9WDe8hz3nxaR_1q-meuHBhjuylEE8/view?usp=sharing", icon: "/images/resume.png"}
  ];

  export const technicalSkills = {
  "Programming Languages": [
    { title: "HTML", imageUrl: "/images/html.png" },
    { title: "CSS", imageUrl: "/images/css.png" },
    { title: "JavaScript", imageUrl: "/images/js.png" },
    { title: "TypeScript", imageUrl: "/images/ts.png" },
    { title: "Python", imageUrl: "/images/python.png" },
    { title: "Java", imageUrl: "/images/java.png" },
    { title: "PHP", imageUrl: "/images/php.png" },
    { title: "SQL", imageUrl: "/images/sql.png" },
  ],
  "Frameworks & Libraries": [
    { title: "React.js + Native", imageUrl: "/images/react.png" },
    { title: "Next.js", imageUrl: "/images/next.png" },
    { title: "Node.js", imageUrl: "/images/node.png" },
    { title: "Express.js", imageUrl: "/images/express.png" },
    { title: "TailwindCSS", imageUrl: "/images/tailwindcss.png" },
    { title: "Django", imageUrl: "/images/django.png" },
    { title: "Bootstrap", imageUrl: "/images/bootstrap.png" },
    { title: "Redux", imageUrl: "/images/redux.png" },
    { title: "Framer Motion", imageUrl: "/images/framer.png" },
  ],
  "Databases, Cloud & DevOps": [
    { title: "MongoDB", imageUrl: "/images/mongodb.png" },
    { title: "MySQL", imageUrl: "/images/mysql.png" },
    { title: "DuckDB", imageUrl: "/images/duckdb.png" },
    { title: "Redis", imageUrl: "/images/redis.png" },
    { title: "AWS", imageUrl: "/images/aws.png" },
    { title: "Netlify", imageUrl: "/images/netlify.png" },
    { title: "Render", imageUrl: "/images/Render.png" },
    { title: "Nginx", imageUrl: "/images/nginx.png" },
    { title: "Swagger", imageUrl: "/images/swagger.png" },
  ],
  "Tools & Software": [
    { title: "Figma", imageUrl: "/images/figma.png" },
    { title: "Photoshop", imageUrl: "/images/photoshop.png" },
    { title: "Git", imageUrl: "/images/git.png" },
    { title: "GitHub", imageUrl: "/images/github.png" },
    { title: "Blender", imageUrl: "/images/blender.png" },
    { title: "Autodesk 3ds Max", imageUrl: "/images/3ds.png" },
    { title: "Visual Studio Code", imageUrl: "/images/vscode.png" },
    { title: "Postman", imageUrl: "/images/postman.png" },
  ],
  "Other Skills": [
    { title: "API Integration", imageUrl: ""},
    { title: "Agile Development" , imageUrl: ""},
    { title: "Responsive Design" , imageUrl: ""},
    { title: "REST APIs" , imageUrl: ""},
    { title: "GraphQL" , imageUrl: ""},
    { title: "OAuth 2.0" , imageUrl: ""},
    { title: "WebSockets" , imageUrl: ""},
    { title: "Generative AI" , imageUrl: ""},
  ],
};
  
  export const projects = [
    {
      id: 0,
      title: "AlertDrive",
      des: "AlertDrive is a mobile application designed to improve road safety by providing real-time alerts when users enter accident-prone areas.",
      img: "/images/AlertDrive.jpg",
      iconLists: [
        "/images/mongodb.png",
        "/images/express.png",
        "/images/react.png",
        "/images/node.png",
        "/images/expo.png",
      ],
      link: "https://github.com/Reizhea/AlertDrive",
    },
    {
      id: 1,
      title: "ShortLinker",
      des: "ShortLinker is an intuitive and efficient platform for shortening URLs, offering users a streamlined way to manage and share their links.",
      img: "/images/ShortLinker.jpg",
      iconLists: [
        "/images/mongodb.png",
        "/images/express.png",
        "/images/react.png",
        "/images/node.png",
        "/images/tailwindcss.png",
      ],
      link: "https://shrtlinker.netlify.app",
    },
  ];

  
  export const certificates = [
    {
      title: "HTML5 and CSS3 Advanced Training",
      img: "/images/HTML5.jpg",
      issuer: "Infosys Springboard",
      issueDate: "August 24, 2024",
      verifyLink: "https://verify.onwingspan.com",
    },
    {
      title: "Mastering Kotlin for Android Development",
      img: "/images/Kotlin.jpg",
      issuer: "Infosys Springboard",
      issueDate: "September 03, 2024",
      verifyLink: "https://verify.onwingspan.com",
    },
    {
      title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
      img: "/images/GenAI.jpg",
      issuer: "LinkedIn Learning",
      issueDate: "August 24, 2024",
      verifyLink: "",
    },
    {
      title: "Hands-on Supervised Machine Learning with Python",
      img: "/images/ML1.jpg",
      issuer: "Infosys Springboard",
      issueDate: "December 13, 2024",
      verifyLink: "https://verify.onwingspan.com",
    },
    {
      title: "Step-by-Step Machine Learning with Python",
      img: "/images/ML2.jpg",
      issuer: "Infosys Springboard",
      issueDate: "December 19, 2024",
      verifyLink: "https://verify.onwingspan.com",
    },
    {
      title: "Getting Started as a Full-Stack Web Developer",
      img: "/images/WebDev.jpg",
      issuer: "LinkedIn Learning",
      issueDate: "August 24, 2024",
      verifyLink: "",
    },
    {
      title: "Software Engineering and Agile software development",
      img: "/images/Agile.jpg",
      issuer: "Infosys Springboard",
      issueDate: "April 05, 2024",
      verifyLink: "https://verify.onwingspan.com",
    },
    {
      title: "AWS Academy Graduate - AWS Academy Cloud Foundations",
      img: "/images/aws.jpg",
      issuer: "AWS Academy",
      issueDate: "March 05, 2025",
      verifyLink: "https://www.credly.com/go/9QacrxLk",
    },
  ];

  export const socialMedia = [
    {
      id: 1,
      img: "images/git.svg",
      link: "https://github.com/Reizhea",
    },
    {
      id: 3,
      img: "images/link.svg",
      link: "https://www.linkedin.com/in/nawang-dorjee/",
    },
  ];

  export const experiences = [
  {
    id: 1,
    company: "Kyoto Creative Co.",
    role: "Full Stack Developer",
    dateRange: "April 2025 – Present",
    highlights: ["100,000+ msgs/mo", "150M+ rows", "20GB+ datasets", "70% faster queries", "30% lower sync latency", "2x faster APIs"],
    tech: [
      "React.js",
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "DuckDB",
      "REST APIs",
      "OAuth",
      "Google Maps API",
    ],
    bullets: [
      "Developed a unified social messaging inbox integrating Facebook, Instagram, and X APIs, processing 100,000+ messages per month with reliable conversation threading and message sync.",
      "Built real-time messaging APIs with conversation history, attachments/media handling, and pagination, reducing sync latency by 30% and improving UX consistency across channels.",
      "Optimized analytics and search workflows on 150M+ rows and 20GB+ datasets using DuckDB/Parquet, reducing query latency by 70% and lowering server costs by 20%.",
      "Built high-throughput REST APIs for filtering and search, plus cron-based automation for cleanup, notifications, and access logging, improving API response times by 2x.",
      "Developed React Native Android features including onboarding and authentication (Firebase), location-based discovery (Maps + geolocation), and category/mood-based filtering.",
      "Implemented ticketing and booking flows with checkout redirects and booking state management, plus QR-code based ticket display/scanning for entry validation.",
    ],
  },
];