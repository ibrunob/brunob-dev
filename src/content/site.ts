/**
 * Single source of truth for every piece of copy on the site.
 * Edit this file. The components read from it and never hardcode content.
 *
 * Content here was drawn from Bruno's LinkedIn profile, his CV and his
 * public GitHub repositories.
 * Anything still marked TODO could not be sourced from those and needs him.
 */

export type Project = {
  slug: string
  title: string
  description: string
  year: string
  tags: string[]
  repo?: string
  demo?: string
  /** Featured projects are the ones previewed on the home page. */
  featured?: boolean
}

export type TimelineEntry = {
  title: string
  organisation: string
  period: string
  description: string
  /** Drives the `alumniOf` / `worksFor` split in the structured data. */
  kind: 'work' | 'education'
}

export type SocialLink = {
  label: string
  href: string
  icon: 'github' | 'x' | 'linkedin'
}

export type StackGroup = {
  label: string
  items: string[]
}

export const site = {
  name: 'Bruno Ortiz Blanco',
  shortName: 'BrunoB',
  role: 'Software Developer',
  url: 'https://brunob.dev',
  email: 'info@brunob.dev',
  cv: '/cv/Bruno_Ortiz_Blanco_CV.pdf',

  /** Not rendered any more: /about says all of this in prose. It stays as
   *  data because the structured data takes the locality from it, and the OG
   *  card and llms.txt both read it. */
  meta: [
    { label: 'Based in', value: 'Gijón, Spain' },
    { label: 'Studying', value: 'Computer Science, University of Oviedo' },
  ],

  intro:
    'I build software that ends up in front of **real people**: small ' +
    'websites for everyday problems, apps and services for companies, ' +
    'and web tools of my own that occasionally grow beyond my ' +
    'expectations.',

  home: [
    'I finished a higher vocational degree in Multiplatform Application ' +
      'Development at CIFP La Laboral and I am now studying Computer ' +
      'Science at the Escuela Politécnica de Ingeniería in Gijón. In ' +
      'between I have written **internal tooling** in Java, Kotlin and Python for ' +
      'companies around Asturias, and spent three months at MediaLab, where I ' +
      'wrote the **API**, the dashboard and the firmware of their sensor platform.',
    'The project I am proudest of started as a way to visualise the 4,096 ' +
      'possible outcomes of the last LEC matchday. The tool ended up on ' +
      'stream in the hands of **major figures of the esports scene**: Ibai, ' +
      'Caedrel and LoL Esports. It pulled over **40,000 unique visitors**, ' +
      '1.5 million requests and a peak of more than 10,000 people on the ' +
      'site at once, with responses staying under two seconds.',
  ],

  about: [
    'I am a software developer based in Gijón, Asturias. I came up through ' +
      'the vocational route: a TIC baccalaureate, then a higher degree in ' +
      'Multiplatform Application Development at CIFP La Laboral, which I ' +
      'finished in 2026 **top of my cohort** with a 9.35 average. Now I am ' +
      'taking the long way ' +
      'round with a Computer Science degree at the University of Oviedo.',
    'Most of my professional work so far has been internal tooling: an ' +
      'Android app for employees wired up to an intranet, a database and an ' +
      'FTP server; a Python tool using **machine learning** to recognise ' +
      'buildings, doorways and kerb ramps in 360º footage; relational ' +
      'database design for a GIS modernisation project for the Cáceres city ' +
      'council; and keeping an occupational-risk inspection app written in ' +
      '2015 alive. Alongside that I take the occasional freelance job, most ' +
      'recently a booking site for a professional League of Legends coach.',
    'At MediaLab I worked across **the whole stack** of their sensor ' +
      'platform in ' +
      'three months: the PHP API and its permission model, the React and ' +
      'TypeScript dashboard on top of it, the C++ firmware running on the ' +
      'devices, and ' +
      'the search on the lab’s public site. Going from an access-control ' +
      'rule to a sensor reading in the same week is the part I enjoyed most.',
    'Most of what I build now has a model somewhere in it. DevLog AI ' +
      'turns commits into logs through the **OpenAI API**, dupay.lol takes ' +
      'submissions from anyone so each one is **moderated and validated** ' +
      'before it goes live, and I work with agents and multi-step ' +
      'orchestration rather than one-shot prompts.',
    'In 2025 I **won the regional SpainSkills competition** in Web ' +
      'Development, ' +
      'which took me to the national final as the Asturias representative, ' +
      'where I **finished 15th**. I like ' +
      'problems where the constraint is real: a deadline, a load spike, ' +
      'someone waiting on the other end.',
  ],

  social: [
    { label: 'GitHub', href: 'https://github.com/ibrunob', icon: 'github' },
    { label: 'X', href: 'https://x.com/brunobdev', icon: 'x' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/brunob-dev/',
      icon: 'linkedin',
    },
  ] satisfies SocialLink[],

  stack: [
    {
      label: 'Languages',
      items: ['TypeScript', 'Java', 'Kotlin', 'Python', 'JavaScript', 'PHP', 'SQL'],
    },
    {
      label: 'Frontend',
      items: [
        'React',
        'Vite',
        'Tailwind CSS',
        'TanStack Query',
        'React Router',
        'Recharts',
        'Leaflet'
      ],
    },
    { label: 'Backend', items: ['Spring Boot', 'Node.js', 'JDBC', 'Laravel'] },
    {
      label: 'AI',
      items: ['OpenAI API', 'Agents and orchestration', 'Guardrails'],
    },
    { label: 'Mobile & desktop', items: ['Android Jetpack Compose', 'JavaFX', 'React Native'] },
    { label: 'Data', items: ['MySQL', 'MongoDB', 'NumPy', 'Pandas', 'Matplotlib'] },
    {
      label: 'Tools',
      items: [
        'VS Code',
        'Figma',
        'Git',
        'GitHub Actions',
        'Docker',
        'Prisma',
        'Postman',
        'opencode',
        'Orca',
      ],
    },
  ] satisfies StackGroup[],

  timeline: [
    {
      title: 'Programmer',
      organisation: 'MediaLab, Universidad de Oviedo',
      kind: 'work',
      period: 'Jan 2026 – Mar 2026',
      description:
        'Built most of **SensorLab**, the lab’s sensor platform: a PHP REST API and a React and TypeScript dashboard covering session authentication, organisation-scoped access control, a three-tier role system, user and device management, alert rules, API logs and generated reports. Also wrote firmware for a static air-quality station and rebuilt the search on MediaLab’s own site using Levenshtein distance and alias scoring.',
    },
    {
      title: 'Junior application developer',
      organisation: 'Omnia 7D / MANTOTAL',
      kind: 'work',
      period: 'Mar 2025 – Jul 2025',
      description:
        'Internal applications to streamline company processes: an Android app for employees connected to the intranet, database and FTP server (Java, PHP, MySQL); a **Python machine-learning tool** recognising buildings, doorways and kerb ramps in 360º video from Insta360 cameras; relational database design for the Cáceres city council GIS project; and maintenance of a 2015 occupational-risk inspection app.',
    },
    {
      title: 'Computer Science',
      organisation: 'Escuela Politécnica de Ingeniería de Gijón',
      kind: 'education',
      period: '2026 – present',
      description: 'Currently in progress.',
    },
    {
      title: 'Multiplatform Application Development (CFGS)',
      organisation: 'CIFP La Laboral',
      kind: 'education',
      period: '2024 – 2026',
      description: 'Finished **top of my cohort** with a 9.35 average.',
    },
  ] satisfies TimelineEntry[],

  projects: [
    {
      slug: 'dupay',
      title: 'dupay.lol',
      description:
        'A live demand market for products nobody has built yet. You describe an idea and set the price points, visitors say what they would actually pay, and ideas rank by **willingness to pay**. Voting needs no account, so everything submitted is moderated and validated first. Next.js on Vercel, and what I am working on right now.',
      year: '2026',
      tags: ['Next.js', 'React', 'Vercel', 'Guardrails'],
      demo: 'https://dupay.lol',
      featured: true,
    },
    {
      // TODO: add the real name of the LEC site and its link (repo and/or demo).
      slug: 'lec-scenarios',
      title: 'LEC final-matchday scenario visualiser',
      description:
        'An interactive view of all 4,096 possible outcomes of the last LEC matchday. Ibai, Caedrel and LoL Esports used it live on stream. It held 40k+ unique visitors, 1.5M+ requests and **10,000+ concurrent users at peak** without going down.',
      year: '2026',
      tags: ['Web', 'Scaling'],
      featured: true,
    },
    {
      // Private repositories in the MediaLabUniovi organisation, so no links.
      slug: 'sensorlab',
      title: 'SensorLab',
      description:
        'The sensor platform for MediaLab at the University of Oviedo: a PHP REST API with a **React and TypeScript dashboard** on top, behind session auth and organisation-scoped permissions. The dashboard is a draggable grid of widgets, with Recharts for the series, Leaflet heatmaps for the sensor map and jsPDF for exported reports. The same front end became their panic-button platform.',
      year: '2026',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'PHP'],
      featured: true,
    },
    {
      // TODO: confirm the year this shipped.
      slug: 'marhoder',
      title: 'marhoder.com',
      description:
        '**Freelance** site for a professional League of Legends coach. A React front end with tiered session plans, each wired to its own Calendly booking flow and paid through Stripe before the slot is confirmed, plus structured data and social cards so the pages preview properly in search and on Discord.',
      year: '2026',
      tags: ['React', 'Vite', 'Calendly', 'Stripe'],
      demo: 'https://marhoder.com',
      featured: true,
    },
    {
      // The repo is private for now. If it is ever published, add `repo` here.
      slug: 'devlog-ai',
      title: 'DevLog AI',
      description:
        'Turns GitHub commits into structured engineering logs: summary, technical changes, bugs, risks and next steps, ready to copy as Markdown. It reads commits over GitHub OAuth and sanitises the diffs before they reach the **OpenAI API**, keeping secrets out of the prompt. The database is switched off, so the live site walks the flow rather than running it.',
      year: '2026',
      tags: ['Next.js', 'React', 'GitHub OAuth', 'OpenAI API'],
      demo: 'https://devlog.brunob.dev',
    },
    {
      slug: 'sensorlab-air-quality',
      title: 'SensorLab air-quality station',
      description:
        'Firmware for a static air-quality sensor reading CO₂, PM2.5, PM10, temperature and humidity, with send intervals driven by the server response and **LoRa** coverage mapping confirmed by ACK. Private repository.',
      year: '2026',
      tags: ['C++', 'LoRa'],
    },
    {
      slug: 'healthcare-cubolab',
      title: 'Healthcare CuboLab',
      description:
        'The emotion cube, a device that lets patients communicate directly with their nurse. I worked on discrete prediction with **Markov models and ETS**, and on the web side.',
      year: '2026',
      tags: ['Python'],
      repo: 'https://github.com/MediaLabUniovi/Healthcare_CuboLab',
    },
    {
      slug: 'reto-treelogic-2026',
      title: 'Chest X-ray anonymisation',
      description:
        'Built with Jorge Alias for the TREE AIBiomed hackathon at Treelogic. Radiographs carry the patient name, record number and age **burned into the pixels**, where deleting the DICOM metadata cannot reach them. A YOLOv8 model finds the text, Tesseract reads it, and spaCy NER decides what is protected data. Dates survive, because they matter diagnostically. **F1 of 0.929**, on CPU alone.',
      year: '2026',
      tags: ['Python', 'YOLOv8', 'spaCy', 'FastAPI', 'Docker'],
      repo: 'https://github.com/ibrunob/Reto-Treelogic2026',
    },
    {
      slug: 'gestor-formaciones',
      title: 'Work placement manager',
      description:
        'The **final project of my DAM degree**: a desktop app for running a school’s workplace-training placements. **Four roles**, each with its own menu, covering companies, student assignments, attendance, evaluations and documents. Java 23 with Spring Boot and JavaFX over MySQL, PDFBox behind the generated reports and email notifications on top.',
      year: '2026',
      tags: ['Java', 'Spring Boot', 'JavaFX', 'MySQL'],
      repo: 'https://github.com/ibrunob/Gestor-Formaciones-Empresa',
    },
    {
      slug: 'youtube-thumbnail-fixer',
      title: 'YouTube Thumbnail Fixer',
      description:
        'A Chrome extension that restores YouTube homepage thumbnails to their previous size.',
      year: '2025',
      tags: ['JavaScript', 'Chrome extension'],
      repo: 'https://github.com/ibrunob/YouTube-Thumbnail-Fixer',
    },
  ] satisfies Project[],
}

export const featuredProjects = site.projects.filter((p) => p.featured)

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
]
