// All site content lives here — edit this file to update the portfolio.

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  role: string;
  highlights: string[];
  stack: string[];
}

export const PROFILE = {
  name: 'Manivel M',
  initials: 'MM',
  title: 'Senior Angular Developer',
  roles: ['Angular Developer', 'Front-End Engineer', 'UI Architect', 'React Developer'],
  location: 'Chennai, India',
  timezoneNote: 'IST (UTC+5:30) — flexible overlap with US, UK & EU hours',
  email: 'maniveluideveloper@gmail.com',
  phone: '+91 9786995053',
  // wa.me link: country code + number, digits only, with a pre-filled greeting.
  whatsapp:
    'https://wa.me/919786995053?text=' +
    encodeURIComponent("Hi Manivel, I found your portfolio and I'd like to discuss a project."),
  linkedin: 'https://www.linkedin.com/in/manivel-frontendengineer',
  github: 'https://github.com/Manivel-Mariyappan',
  resume: 'Manivel_Resume.pdf',
  // Contact form delivery via EmailJS (https://www.emailjs.com) — see README for setup.
  // These values are public by design. Leave any empty to fall back to opening the visitor's email client.
  emailjs: {
    serviceId: 'service_wc1r2d9',
    templateId: 'template_h6jp37a',
    publicKey: '4jKNtGILZXQt0BkHD',
  },
  summary:
    'Senior Software Engineer with nearly a decade of front-end experience, specialising in Angular (15+), ' +
    'React and modern JavaScript. I build fast, responsive, maintainable web applications — from reusable ' +
    'component libraries to real-time dashboards — and I take ownership from requirements to delivery.',
  about: [
    'I have spent the last 9+ years building production web applications for healthcare and SaaS products. ' +
      'Most of that time I have led UI teams on large Angular applications: practice-management systems, ' +
      'VoIP platforms and real-time scheduling tools used daily by clinics.',
    'I work directly with clients to turn requirements into clean, well-documented solutions. I care about ' +
      'reusable architecture, performance and pixel-accurate, accessible interfaces that work across every browser and device.',
  ],
};

export const STATS = [
  { value: '9+', label: 'Years of experience' },
  { value: '3+', label: 'Major products shipped' },
  { value: '8+', label: 'Years building Angular apps' },
  { value: '100%', label: 'Remote-ready' },
];

export const SERVICES: Service[] = [
  {
    icon: 'code',
    title: 'Angular Application Development',
    description:
      'End-to-end Angular apps with standalone components, signals, NgRx and clean, scalable architecture — from project setup to production.',
  },
  {
    icon: 'upgrade',
    title: 'Upgrades & Migrations',
    description:
      'Move legacy AngularJS or older Angular versions to the latest release with minimal disruption and better performance.',
  },
  {
    icon: 'layers',
    title: 'Reusable Component Libraries',
    description:
      'Design-system style libraries of inputs, date/time pickers, grids and skeleton loaders that keep your UI consistent.',
  },
  {
    icon: 'bolt',
    title: 'Real-Time Features',
    description:
      'Live updates, chat and notifications with SignalR and WebSockets, integrated cleanly with your REST APIs.',
  },
  {
    icon: 'grid',
    title: 'Enterprise UI (Kendo / DevExpress)',
    description:
      'Data-heavy dashboards, schedulers, reports and grids using Kendo UI, DevExpress and Angular Material.',
  },
  {
    icon: 'device',
    title: 'Responsive UI & Performance',
    description:
      'Pixel-accurate, cross-browser layouts from Figma / Adobe XD designs, tuned for speed on every device.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  { title: 'Frameworks', skills: ['Angular (15+)', 'React.js', 'AngularJS', 'NgRx', 'Redux', 'RxJS'] },
  { title: 'Languages', skills: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3 / SCSS', 'jQuery'] },
  { title: 'UI Libraries', skills: ['Kendo UI', 'DevExpress UI', 'Angular Material', 'Material UI', 'Bootstrap'] },
  { title: 'Integration', skills: ['REST APIs', 'Microsoft SignalR', 'React Hook Form', 'Reactive Forms'] },
  { title: 'Tooling', skills: ['Git', 'GitHub', 'GitLab', 'Azure Repos', 'Webpack', 'VS Code', 'Visual Studio'] },
  { title: 'Process', skills: ['Agile / Scrum', 'Client communication', 'Team leadership', 'Mentoring', 'Adobe XD'] },
];

export const EXPERIENCE: Experience[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Infinire Innovative Software Solutions Pvt Ltd',
    location: 'Chennai, India',
    period: 'Jan 2018 — Present',
    points: [
      'Lead UI development for orthodontic practice-management and VoIP products built with Angular.',
      'Built responsive, reusable component libraries with Angular and CSS3, improving speed and device compatibility.',
      'Integrated Kendo UI and DevExpress UI for schedulers, grids and reporting.',
      'Work directly with clients to gather requirements, deliver tailored solutions and write documentation.',
    ],
  },
  {
    role: 'UI Developer',
    company: 'Aryu Enterprises Pvt Ltd',
    location: 'Chennai, India',
    period: 'Dec 2016 — Dec 2017',
    points: [
      'Developed and optimised responsive web pages using HTML, CSS and JavaScript.',
      'Delivered high-performance websites with a seamless experience across devices.',
      'Resolved critical browser-compatibility issues, reducing support requests.',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'OPMS',
    tagline: 'Ortho Practice Management Service',
    description:
      'A full practice-management platform for orthodontic clinics: patient forms, appointment scheduling, service-contract signing, ' +
      'treatment cards, patient imaging, payments, insurance and reporting — with real-time updates, chat and calling.',
    role: 'Senior Software Engineer · UI Lead',
    highlights: [
      'Set up the Angular application and environment from scratch',
      'Led the UI team and owned front-end design and layout',
      'Built scheduling modules with live SignalR appointment updates',
      'Created a shared library of inputs, pickers, dropdowns and skeleton spinners',
    ],
    stack: ['Angular', 'NgRx', 'Kendo UI', 'DevExpress', 'SignalR', 'REST API', 'Bootstrap'],
  },
  {
    name: 'OrthoVoIP',
    tagline: 'VoIP phone system for orthodontic practices',
    description:
      'A customisable, reliable VoIP communication platform that helps practices and DSOs streamline operations and improve patient satisfaction.',
    role: 'Senior Software Engineer',
    highlights: [
      'Integrated APIs across the Angular application',
      'Built reusable reports, chat and real-time SignalR components',
      'Delivered follow-up, billing and fax modules',
      'Ran regular client calls to gather and refine requirements',
    ],
    stack: ['Angular', 'Kendo UI', 'SignalR', 'REST API', 'Bootstrap'],
  },
  {
    name: 'Meetstand',
    tagline: 'Asynchronous stand-up & check-in tool',
    description:
      'A collaboration tool that lets teams run stand-ups and check-ins asynchronously, staying aligned without syncing in real time.',
    role: 'Software Engineer',
    highlights: [
      'Set up the React project and designed the full layout',
      'Managed application state with Redux',
      'Built reusable components and form validation with React Hook Form',
      'Handled all API integration',
    ],
    stack: ['React', 'Redux', 'React Hook Form', 'REST API', 'Bootstrap'],
  },
];

export const PROCESS = [
  { step: '01', title: 'Discover', text: 'A short call to understand your goals, users, timeline and budget.' },
  { step: '02', title: 'Plan', text: 'A clear scope, milestones and estimate — no surprises.' },
  { step: '03', title: 'Build', text: 'Iterative delivery with regular demos and clean, documented code.' },
  { step: '04', title: 'Launch & Support', text: 'Deployment help, handover and ongoing maintenance if you need it.' },
];

export const EDUCATION = {
  degree: 'Bachelor of Engineering — Electronics & Communication',
  school: 'Jayam College of Engineering and Technology, Dharmapuri',
  year: '2016',
};
