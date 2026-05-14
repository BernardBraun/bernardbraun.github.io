import { useCallback, useEffect, useId, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useLanguage } from "./context/LanguageContext";
import { calculateAge } from "./utils/age";
import experiencesFile from "../experiences.json";
import projectsFile from "../projects.json";

type Section = "home" | "experiences" | "projects";

type ExperienceRow = {
  empresa: string;
  logo: string;
  periodo: string;
  cargo: string;
  descricao: string;
};

type ProjectRow = {
  projeto: string;
  projeto_en?: string;
  imagem: string;
  resumo: string;
  resumo_en?: string;
  tecnologias: string[];
};

const experiences = experiencesFile.experiencias as ExperienceRow[];
const projects = projectsFile.projetos as ProjectRow[];

function assetUrl(path: string) {
  if (path.startsWith("http")) return path;
  return path.replace(/^\.\//, "/");
}

const spring = { type: "spring" as const, stiffness: 380, damping: 32 };
const fadeUp = (reduce: boolean) =>
  reduce
    ? { initial: false, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0, transition: spring },
        exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
      };

export default function App() {
  const { locale, setLocale, t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [section, setSection] = useState<Section>("home");
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);
  const contactTitleId = useId();

  useEffect(() => {
    document.title = t.metaTitle;
  }, [t.metaTitle]);

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContactOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [contactOpen]);

  const copy = useCallback(async (kind: "email" | "phone") => {
    const text = kind === "email" ? t.contact.email : t.contact.phone;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }, [t.contact.email, t.contact.phone]);

  const fu = fadeUp(!!reduceMotion);
  const age = calculateAge();
  const bioParagraphs = t.bio.paragraphs.map((p) => p.replace(/\{\{age\}\}/g, String(age)));

  return (
    <MotionConfig reducedMotion="user">
      <div className="page-bg" aria-hidden />
      <div className="shell">
        <header className="site-header">
          <h1 className="site-title">
            <a href="/" onClick={() => setSection("home")}>
              {t.headerName}
            </a>
          </h1>
          <div className="header-actions">
            <div
              className="lang-toggle"
              role="group"
              aria-label={locale === "pt-BR" ? "Idioma" : "Language"}
            >
              <button
                type="button"
                className="lang-btn"
                aria-pressed={locale === "pt-BR"}
                aria-label="Português (Brasil)"
                onClick={() => setLocale("pt-BR")}
              >
                <span className="lang-flag" aria-hidden>
                  🇧🇷
                </span>
              </button>
              <button
                type="button"
                className="lang-btn"
                aria-pressed={locale === "en-US"}
                aria-label="English (US)"
                onClick={() => setLocale("en-US")}
              >
                <span className="lang-flag" aria-hidden>
                  🇺🇸
                </span>
              </button>
            </div>
            <nav className="social-links" aria-label="Social">
              <a
                href="https://www.linkedin.com/in/bernard-braun-da-silva/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin" aria-hidden />
              </a>
              <a
                href="https://github.com/BernardBraun"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github" aria-hidden />
              </a>
            </nav>
          </div>
        </header>

        <div className="layout">
          <aside className="sidebar">
            <motion.div
              className="avatar-wrap"
              initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={spring}
            >
              <div className="avatar-ring" aria-hidden />
              <img
                className="avatar"
                src="/images/profile.png"
                width={440}
                height={440}
                alt=""
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>
            <nav className="nav-pills" aria-label={locale === "pt-BR" ? "Seções" : "Sections"}>
              {(
                [
                  ["home", t.nav.home],
                  ["experiences", t.nav.experiences],
                  ["projects", t.nav.projects],
                  ["contact", t.nav.contact],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className="nav-pill"
                  data-active={section === key}
                  onClick={() => {
                    if (key === "contact") {
                      setContactOpen(true);
                      return;
                    }
                    setSection(key);
                  }}
                >
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="main-panel">
            <AnimatePresence mode="wait">
              {section === "home" && (
                <motion.section
                  key="home"
                  {...fu}
                  aria-labelledby="home-heading"
                >
                  <h2 id="home-heading" className="page-heading">
                    {t.nav.home}
                  </h2>
                  <p className="bio-greeting">{t.bio.greeting}</p>
                  <div className="bio-text">
                    {bioParagraphs.map((para, i) => (
                      <motion.p
                        key={i}
                        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: reduceMotion ? 0 : 0.04 * i,
                          ...spring,
                        }}
                      >
                        {para}
                      </motion.p>
                    ))}
                  </div>
                </motion.section>
              )}

              {section === "experiences" && (
                <motion.section
                  key="exp"
                  {...fu}
                  aria-labelledby="exp-heading"
                >
                  <h2 id="exp-heading" className="page-heading">
                    {t.experiences.pageTitle}
                  </h2>
                  {t.experiences.contentNote ? (
                    <p className="content-note">{t.experiences.contentNote}</p>
                  ) : null}
                  <div className="exp-list">
                    {experiences.map((exp, i) => (
                      <motion.article
                        key={`${exp.empresa}-${exp.periodo}-${i}`}
                        className="exp-card"
                        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          delay: reduceMotion ? 0 : Math.min(i * 0.05, 0.35),
                          ...spring,
                        }}
                      >
                        <div className="exp-logo-slot">
                          <img
                            className="exp-logo"
                            src={assetUrl(exp.logo)}
                            alt=""
                            loading="lazy"
                          />
                        </div>
                        <div className="exp-meta">
                          <h2>{exp.empresa}</h2>
                          <p className="role">{exp.cargo}</p>
                          <p className="period">{exp.periodo}</p>
                          <div
                            className="exp-desc"
                            dangerouslySetInnerHTML={{ __html: exp.descricao }}
                          />
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </motion.section>
              )}

              {section === "projects" && (
                <motion.section
                  key="proj"
                  {...fu}
                  aria-labelledby="proj-heading"
                >
                  <h2 id="proj-heading" className="page-heading">
                    {t.projects.pageTitle}
                  </h2>
                  <div className="proj-grid">
                    {projects.map((p, i) => {
                      const title =
                        locale === "en-US" && p.projeto_en ? p.projeto_en : p.projeto;
                      const summary =
                        locale === "en-US" && p.resumo_en ? p.resumo_en : p.resumo;
                      return (
                        <motion.article
                          key={p.projeto}
                          className="proj-card"
                          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-30px" }}
                          transition={{
                            delay: reduceMotion ? 0 : i * 0.08,
                            ...spring,
                          }}
                        >
                          <h2>{title}</h2>
                          <img
                            src={assetUrl(p.imagem)}
                            alt=""
                            loading="lazy"
                          />
                          <p>{summary}</p>
                          <div className="tech-row">
                            <span className="tech-label">{t.projects.techLabel}</span>
                            <div className="tech-icons">
                              {p.tecnologias.map((url) => (
                                <img key={url} src={url} alt="" loading="lazy" />
                              ))}
                            </div>
                          </div>
                          {i < projects.length - 1 ? (
                            <hr className="proj-divider" />
                          ) : null}
                        </motion.article>
                      );
                    })}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {contactOpen ? (
          <motion.div
            className="modal-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContactOpen(false)}
          >
            <motion.div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={contactTitleId}
              initial={reduceMotion ? false : { scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { scale: 0.96, opacity: 0, y: 8 }}
              transition={spring}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id={contactTitleId}>{t.contact.modalTitle}</h2>
              <p className="lead">{t.contact.modalLead}</p>
              <div className="contact-block">
                <label htmlFor="c-email">E-mail</label>
                <div id="c-email" className="contact-value">
                  {t.contact.email}
                </div>
              </div>
              <div className="contact-block">
                <label htmlFor="c-phone">
                  {locale === "pt-BR" ? "Telefone" : "Phone"}
                </label>
                <div id="c-phone" className="contact-value">
                  {t.contact.phone}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-primary" onClick={() => copy("email")}>
                  {copied === "email" ? t.contact.copied : t.contact.copyEmail}
                </button>
                <button type="button" className="btn btn-primary" onClick={() => copy("phone")}>
                  {copied === "phone" ? t.contact.copied : t.contact.copyPhone}
                </button>
                <button type="button" className="btn" onClick={() => setContactOpen(false)}>
                  {t.contact.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  );
}
