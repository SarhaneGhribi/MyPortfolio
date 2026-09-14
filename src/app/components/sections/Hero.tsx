import PhoneFrame from "../phone/PhoneFrame";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 lg:flex-row lg:justify-center lg:gap-16 lg:pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(231,156,233,0.25) 0%, rgba(139,108,242,0.12) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-xl text-center lg:text-left">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          React Native Developer
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Sarhane Ghribi
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          I build mobile products end-to-end — from idea to the App Store.
          Self-taught, currently shipping cross-platform apps and the
          backends behind them.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
        </div>
        <p className="mt-10 hidden text-sm text-muted lg:block">
          ↳ tap the icons on the phone — it&apos;s all real, it all works.
        </p>
      </div>

      <div className="relative z-10 mt-16 flex justify-center lg:mt-0">
        {/* On very small phones (< 360px wide) the phone mockup's fixed
            300x640 footprint would overflow the viewport, so it's scaled
            down as a whole unit — the wrapper is sized to match the scaled
            result so no extra layout gap is left around it. */}
        <div className="h-[544px] w-[255px] origin-top-left scale-[0.85] min-[360px]:h-[640px] min-[360px]:w-[300px] min-[360px]:scale-100">
          <PhoneFrame />
        </div>
      </div>

      <p className="relative z-10 mt-8 text-sm text-muted lg:hidden">
        ↳ tap the icons on the phone — it&apos;s all real, it all works.
      </p>
    </section>
  );
};

export default Hero;
