const skillGroups: { label: string; skills: string[] }[] = [
  {
    label: "Mobile & Frontend",
    skills: ["React Native", "Expo", "React", "Next.js", "Angular", "TypeScript", "Redux", "Zustand"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "NestJS", "Express", "Socket.io", "REST", "GraphQL", "WebSocket"],
  },
  {
    label: "Data & ML",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "OpenCV", "YOLOv8", "Tesseract OCR"],
  },
  {
    label: "Tooling",
    skills: ["Docker", "Nginx", "PM2", "Git", "Jest"],
  },
];

const About = () => {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
        About
      </p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        From business & operations to shipping mobile apps
      </h2>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
        <p>
          I didn&apos;t come up through a computer science degree. I started
          in business and operations — project management on factory floors
          in Sfax, commercial management in Abidjan — before retraining as a
          full-stack JavaScript developer through RBK&apos;s bootcamp in
          2023. I taught myself the rest by building.
        </p>
        <p>
          Since then I&apos;ve worked as a full-stack React Native developer
          at Infinitum Tech, where I&apos;ve designed and shipped
          cross-platform mobile apps and the Node.js/NestJS backends behind
          them — including <strong className="text-foreground">AvatarID</strong>,
          a biometric identity-verification app with Face ID/fingerprint
          login, live-presence liveness detection, and a backend that
          combines RSA/AES hybrid encryption with a Python-based
          face-recognition pipeline. More recently I&apos;ve worked
          extensively on <strong className="text-foreground">Yeiza</strong> and{" "}
          <strong className="text-foreground">Yeiza Business</strong>, both
          live on iOS and Android.
        </p>
        <p>
          Outside of client work I like building small, complete things —
          games, UI experiments, npm packages — mostly to learn how
          something works by shipping it end to end.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <h3 className="text-sm font-semibold text-foreground">
              {group.label}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
