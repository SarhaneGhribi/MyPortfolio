import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa";

const links = [
  {
    label: "sarhane.ghribi@gmail.com",
    url: "mailto:sarhane.ghribi@gmail.com",
    icon: FaEnvelope,
  },
  {
    label: "GitHub",
    url: "https://github.com/SarhaneGhribi",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/sarhaneghribi",
    icon: FaLinkedin,
  },
  {
    label: "Download CV",
    url: "/SarhaneGhribi-eng.pdf",
    icon: FaFileDownload,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Contact
      </p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        Let&apos;s build something
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
        Open to new opportunities and interesting mobile projects. Reach out
        directly, or grab my CV below.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {links.map(({ label, url, icon: Icon }) => (
          <a
            key={label}
            href={url}
            target={url.startsWith("http") ? "_blank" : undefined}
            rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <Icon />
            {label}
          </a>
        ))}
      </div>

      <p className="mt-16 text-xs text-muted">
        © {new Date().getFullYear()} Sarhane Ghribi
      </p>
    </section>
  );
};

export default Contact;
