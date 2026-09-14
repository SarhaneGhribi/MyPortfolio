import { FaGithub, FaNpm, FaApple } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: { label: string; url: string; icon: "github" | "npm" | "apple" };
  note?: string;
}

const projects: Project[] = [
  {
    title: "Yeiza & Yeiza Business",
    description:
      "A loyalty & rewards platform, live on iOS and Android — a consumer app for collecting digital stamps and redeeming rewards, a merchant dashboard for gift cards and promotions, and the NestJS backend (auth, Stripe, Fortnox accounting integration) powering both.",
    tags: ["React Native", "Expo", "NestJS", "Stripe", "Sequelize"],
    link: { label: "App Store", url: "https://apps.apple.com/us/app/yeiza/id6749094971", icon: "apple" },
    note: "Also explorable live in the phone above.",
  },
  {
    title: "AvatarID",
    description:
      "A biometric identity-verification app: Face ID/fingerprint login, a liveness-detection flow that guides users through live actions, and a NestJS backend combining RSA/AES hybrid encryption with a Python face-recognition pipeline.",
    tags: ["React Native", "NestJS", "Python", "OpenCV", "Computer Vision"],
    note: "Try the liveness demo live in the phone above.",
  },
  {
    title: "OpsFlow",
    description:
      "A field-operations & retail-execution platform: an Angular admin dashboard for managing users, roles/permissions, geographic nodes, sales channels and SKUs, paired with an Expo field app for on-site POS visits and a NestJS backend.",
    tags: ["Angular", "React Native", "Expo", "NestJS", "RBAC"],
  },
  {
    title: "react-native-klarna-inapp-sdk",
    description:
      "Klarna's official React Native wrapper for their in-app SDK — an open-source contribution used by other developers integrating Klarna payments.",
    tags: ["React Native", "Kotlin", "Open Source"],
    link: {
      label: "GitHub",
      url: "https://github.com/SarhaneGhribi/react-native-klarna-inapp-sdk",
      icon: "github",
    },
  },
  {
    title: "react-native-permissions-ui",
    description:
      "A published npm package for building custom, on-brand permission-request screens (camera, location, etc.) instead of relying on default OS dialogs.",
    tags: ["React Native", "TypeScript", "npm Package"],
    link: {
      label: "npm",
      url: "https://www.npmjs.com/package/react-native-permissions-ui",
      icon: "npm",
    },
  },
  {
    title: "phone-dial-login",
    description:
      "A login screen reimagined as an old rotary phone dial — a small animation-focused experiment in making a mundane screen memorable.",
    tags: ["React Native", "Animation"],
    link: {
      label: "GitHub",
      url: "https://github.com/SarhaneGhribi/phone-dial-login",
      icon: "github",
    },
  },
  {
    title: "Motion Expression Detector",
    description:
      "An Expo app using camera + face detection to guide users through live commands (blink, turn, smile) in real time — an early prototype of the liveness work later built into AvatarID.",
    tags: ["Expo", "Face Detection", "Computer Vision"],
    link: {
      label: "GitHub",
      url: "https://github.com/SarhaneGhribi/Motion-expression-detector",
      icon: "github",
    },
  },
];

const icons = {
  github: FaGithub,
  npm: FaNpm,
  apple: FaApple,
};

const Projects = () => {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Projects
      </p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Selected work</h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        A mix of shipped products, open-source contributions, and small
        experiments. A few of these are also playable directly in the phone
        above.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const Icon = project.link ? icons[project.link.icon] : null;
          return (
            <div
              key={project.title}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                {project.link ? (
                  <a
                    href={project.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                  >
                    {Icon && <Icon />}
                    {project.link.label}
                  </a>
                ) : (
                  <span />
                )}
                {project.note && (
                  <span className="text-xs italic text-muted">
                    {project.note}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
