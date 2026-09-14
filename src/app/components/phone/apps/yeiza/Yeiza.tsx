import React from "react";
import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";

interface AppLink {
  store: "apple" | "google";
  label: string;
  url: string;
}

interface AppEntry {
  icon: string;
  name: string;
  tagline: string;
  links: AppLink[];
}

const apps: AppEntry[] = [
  {
    icon: "/yeiza-icon.png",
    name: "Yeiza",
    tagline:
      "Consumer loyalty app — subscribe to local businesses, collect digital stamps, and redeem rewards.",
    links: [
      {
        store: "apple",
        label: "App Store",
        url: "https://apps.apple.com/us/app/yeiza/id6749094971",
      },
      {
        store: "google",
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.gahuset.yeiza",
      },
    ],
  },
  {
    icon: "/yeiza-business-icon.png",
    name: "Yeiza Business",
    tagline:
      "Merchant dashboard app — create digital gift cards, run promotions, and track redemptions in real time.",
    links: [
      {
        store: "apple",
        label: "App Store",
        url: "https://apps.apple.com/us/app/yeiza-business/id6749095050",
      },
      {
        store: "google",
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.gahuset.yeizaBusiness",
      },
    ],
  },
];

const Yeiza = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Yeiza</h2>
      <p style={styles.subtitle}>
        A loyalty &amp; rewards platform by GA Huset AB, live on iOS &amp;
        Android. I worked extensively on both mobile apps and the backend
        that powers them.
      </p>

      {apps.map((app) => (
        <div key={app.name} style={styles.card}>
          <div style={styles.cardHeader}>
            <Image
              src={app.icon}
              alt={app.name}
              width={48}
              height={48}
              style={styles.icon}
            />
            <h3 style={styles.appName}>{app.name}</h3>
          </div>
          <p style={styles.tagline}>{app.tagline}</p>
          <div style={styles.linkRow}>
            {app.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.linkButton}
              >
                {link.store === "apple" ? <FaApple /> : <FaGooglePlay />}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ))}

      <div style={styles.backendCard}>
        <h3 style={styles.appName}>Backend</h3>
        <p style={styles.tagline}>
          A NestJS API serving both apps: authentication, Stripe payments,
          Fortnox accounting integration, SMS/email notifications, and
          multi-tenant data across business, client, back-office, and
          transaction domains.
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
    height: "100%",
    padding: "20px 16px",
    overflowY: "auto",
    background: "linear-gradient(180deg, #f0a3f0 0%, #dd8fe0 100%)",
    borderRadius: "20px",
  },
  title: {
    color: "white",
    fontSize: "26px",
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "13px",
    lineHeight: 1.4,
    margin: 0,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: "14px",
    padding: "14px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    width: "48px",
    height: "48px",
    objectFit: "cover",
    borderRadius: "12px",
    flexShrink: 0,
  },
  appName: {
    color: "white",
    fontSize: "16px",
    fontWeight: 600,
    margin: 0,
  },
  tagline: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "12px",
    lineHeight: 1.35,
    margin: 0,
  },
  linkRow: {
    display: "flex",
    gap: "8px",
    marginTop: "4px",
  },
  linkButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    fontWeight: 600,
    color: "#dd8fe0",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "6px 10px",
    textDecoration: "none",
  },
  backendCard: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: "14px",
    padding: "14px",
  },
};

export default Yeiza;
