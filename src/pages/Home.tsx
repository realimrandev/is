/*
Design system (Cyber-Brutalist / Ghost Cursor):
- Dark, neon accents (green + pink), sharp borders, diagonals.
- Broken grid composition; large type; visible motion.
- Sections: Hero, About, Skills, Projects, Contact.
*/

import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Camera,
  BriefcaseBusiness,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ArrowDownRight,
  Sparkles,
  GraduationCap,
  Code2,
} from "lucide-react";

import BackgroundFX from "@/components/BackgroundFX";
import ReactBitsGhostCursor from "@/components/ReactBitsGhostCursor";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import imranImg from "@/assets/profile/imran.jpg";
import newsImg from "@/assets/projects/news.png";
import taskImg from "@/assets/projects/taskapp.png";
import billsImg from "@/assets/projects/bills.png";

const SOCIALS = {
  instagram: "https://www.instagram.com/cybernaticdream?igsh=aTE2ZWtsbDhsNmxx",
  linkedin:
    "https://www.linkedin.com/in/imran-sabir-developer?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  tiktok: "https://www.tiktok.com/@cybernetic_dream?_r=1&_t=ZS-95MHRW2EZy4",
};

interface HomeProps {
  targetSection?: string;
}

export default function Home({ targetSection }: HomeProps) {
  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [targetSection]);

  const projects = useMemo(
    () => [
      {
        title: "News Website",
        label: "React + UI",
        desc: "News-style layout with categories and search.",
        href: "https://task-black-beta.vercel.app/",
        img: newsImg,
      },
      {
        title: "Task App",
        label: "Productivity",
        desc: "Add/remove tasks with a clean UI (theme picker).",
        href: "https://taskapp-two-delta.vercel.app/",
        img: taskImg,
      },
      {
        title: "Bills App",
        label: "Utility",
        desc: "A simple bill-split app with a players workflow.",
        href: "https://reactbills.vercel.app/",
        img: billsImg,
      },
    ],
    [],
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <BackgroundFX />
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 25 }}>
        <ReactBitsGhostCursor
          // Visuals
          color="#00FFAE"
          brightness={2}
          edgeIntensity={0.25}

          // Trail and motion
          trailLength={50}
          inertia={0.5}

          // Post-processing
          grainIntensity={0.05}
          bloomStrength={0.12}
          bloomRadius={1}
          bloomThreshold={0.025}

          // Fade-out behavior
          fadeDelayMs={1000}
          fadeDurationMs={1500}
          zIndex={25}
        />
      </div>

      {/* top rail */}
      <header className="fixed left-0 right-0 top-0 z-30">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl border border-white/15 bg-gradient-to-br from-emerald-400/20 via-white/5 to-fuchsia-500/15" />
              <div className="leading-tight">
                <div className="font-display text-sm tracking-wide">IMRAN SABIR</div>
                <div className="text-xs text-white/60">Prompt Engineer • Full‑Stack Developer</div>
              </div>
            </div>

            <nav className="hidden items-center gap-2 md:flex">
              <NavLink to="/about">About</NavLink>
              <NavLink to="/skills">Skills</NavLink>
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </nav>

            <div className="flex items-center gap-2">
              <IconLink href={SOCIALS.instagram} label="Instagram">
                <Camera className="h-4 w-4" />
              </IconLink>
              <IconLink href={SOCIALS.linkedin} label="LinkedIn">
                <BriefcaseBusiness className="h-4 w-4" />
              </IconLink>
              <IconLink href={SOCIALS.tiktok} label="TikTok">
                <span className="text-sm font-semibold">TT</span>
              </IconLink>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section id="top" className="pt-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/35 p-6 backdrop-blur-xl md:p-10">
              {/* diagonal slices */}
              <div className="pointer-events-none absolute -left-20 -top-24 h-52 w-[520px] rotate-[-12deg] bg-gradient-to-r from-emerald-400/30 to-transparent blur-2xl" />
              <div className="pointer-events-none absolute -right-24 top-24 h-64 w-[520px] rotate-[14deg] bg-gradient-to-l from-fuchsia-500/25 to-transparent blur-2xl" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(135deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:14px_14px]" />

              <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr] md:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border border-emerald-300/30 bg-emerald-500/15 text-emerald-200">
                      Available for Freelance / Work
                    </Badge>
                    <Badge className="border border-fuchsia-300/25 bg-fuchsia-500/10 text-fuchsia-200">
                      Lahore, Pakistan
                    </Badge>
                  </div>

                  <h1 className="mt-5 font-display text-[44px] leading-[0.95] tracking-tight text-white md:text-[68px]">
                    Cyber‑Clean
                    <span className="text-white/40">.</span>
                    <br />
                    Full‑Stack Portfolio
                    <span className="text-emerald-300">.</span>
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                    I’m <span className="text-white">Imran Sabir</span> — a Senior Prompt Engineer, Frontend + Backend Developer, and React Developer. I focus on fast UI, clean UX, and practical products.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Button asChild className="bg-emerald-400 text-black hover:bg-emerald-300">
                      <Link href="/projects">
                        View Projects <ArrowDownRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                      <Link href="/contact">
                        Contact <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <div className="ml-1 hidden items-center gap-2 text-xs text-white/55 md:flex">
                      <Sparkles className="h-4 w-4 text-fuchsia-200" />
                      Ghost cursor + animated background enabled
                    </div>
                  </div>

                  <Separator className="my-8 bg-white/10" />

                  <div className="grid gap-3 md:grid-cols-3">
                    <MiniStat title="6+ months" value="Corvit course" icon={<GraduationCap className="h-4 w-4" />} />
                    <MiniStat title="React" value="Modern UI" icon={<Code2 className="h-4 w-4" />} />
                    <MiniStat title="Full‑Stack" value="Frontend + Backend" icon={<Sparkles className="h-4 w-4" />} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.75, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                  className="relative"
                >
                  <div className="absolute -inset-3 -z-10 rounded-[26px] bg-gradient-to-br from-emerald-400/20 via-transparent to-fuchsia-500/20 blur-xl" />
                  <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/40">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                    <img
                      src={imranImg}
                      alt="Imran Sabir"
                      className="h-[420px] w-full object-cover md:h-[520px]"
                      loading="eager"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <div className="font-display text-lg text-white">Imran Sabir</div>
                          <div className="text-sm text-white/70">React • UI Systems • Backend APIs</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/45 px-3 py-2 text-xs text-white/70">
                          Scroll ↓
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <Section id="about" title="About" kicker="About me" right="01">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
            <Card className="border-white/10 bg-black/35 p-6 text-white/80">
              <h3 className="font-display text-xl text-white">What I do</h3>
              <p className="mt-3 leading-relaxed text-white/70">
                I build web apps that are fast, responsive, and production‑ready. From prompt engineering to UI/UX, React components, and backend integrations — I deliver end‑to‑end solutions.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Prompt Engineering",
                  "React + TypeScript",
                  "Frontend Architecture",
                  "Backend APIs",
                  "Deployment (Vercel)",
                ].map((s) => (
                  <Badge key={s} className="border border-white/10 bg-white/5 text-white/80">
                    {s}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="border-white/10 bg-black/35 p-6 text-white/80">
              <h3 className="font-display text-xl text-white">Education / Training</h3>
              <div className="mt-3 rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-white">Corvit — Web Development</div>
                    <div className="text-sm text-white/60">6 months intensive course</div>
                  </div>
                  <div className="font-display text-2xl text-emerald-200">6M</div>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <InfoLine icon={<MapPin className="h-4 w-4" />} label="Address" value="Lahore, Punjab, Pakistan" />
                <InfoLine icon={<Phone className="h-4 w-4" />} label="Phone" value="0329 4963776" />
                <InfoLine icon={<Mail className="h-4 w-4" />} label="Email" value="imransabir2005@gmail.com" />
              </div>
            </Card>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" title="Skills" kicker="Tech Stack" right="02">
          <div className="grid gap-6 md:grid-cols-3">
            <SkillCard
              title="Frontend"
              items={["React", "TypeScript", "Tailwind", "shadcn/ui", "Animations (Framer)"]}
            />
            <SkillCard
              title="Backend"
              items={["REST APIs", "Auth basics", "DB fundamentals", "Node ecosystem", "Deployment mindset"]}
            />
            <SkillCard
              title="Workflow"
              items={["Prompt engineering", "UI systems", "Git", "Vercel deploy", "Performance tuning"]}
            />
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects" kicker="Live Projects" right="03">
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((p, idx) => (
              <motion.a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-black/35"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -left-16 -top-20 h-52 w-80 rotate-[-10deg] bg-emerald-400/15 blur-2xl" />
                  <div className="absolute -right-16 top-20 h-56 w-80 rotate-[12deg] bg-fuchsia-500/15 blur-2xl" />
                </div>

                <div className="aspect-[16/10] overflow-hidden border-b border-white/10">
                  <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-display text-xl text-white">{p.title}</div>
                    <ExternalLink className="h-4 w-4 text-white/60" />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className="border border-white/10 bg-white/5 text-white/75">{p.label}</Badge>
                    <span className="text-xs text-white/50">Live on Vercel</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{p.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact" kicker="Let’s build" right="04">
          <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
            <Card className="border-white/10 bg-black/35 p-6">
              <h3 className="font-display text-xl text-white">Direct Contact</h3>
              <p className="mt-2 text-sm text-white/70">
                Send your project idea — I reply quickly.
              </p>

              <div className="mt-5 grid gap-3">
                <CopyLine label="Email" value="imransabir2005@gmail.com" icon={<Mail className="h-4 w-4" />} />
                <CopyLine label="Phone" value="03294963776" icon={<Phone className="h-4 w-4" />} />
                <CopyLine label="Address" value="Lahore, Punjab, Pakistan" icon={<MapPin className="h-4 w-4" />} />
              </div>
            </Card>

            <Card className="border-white/10 bg-black/35 p-6">
              <h3 className="font-display text-xl text-white">Socials</h3>
              <p className="mt-2 text-sm text-white/70">Follow for updates and new work.</p>

              <div className="mt-5 grid gap-3">
                <SocialRow icon={<Camera className="h-4 w-4" />} label="Instagram" href={SOCIALS.instagram} />
                <SocialRow icon={<BriefcaseBusiness className="h-4 w-4" />} label="LinkedIn" href={SOCIALS.linkedin} />
                <SocialRow icon={<span className="text-sm font-semibold">TT</span>} label="TikTok" href={SOCIALS.tiktok} />
              </div>

              <Separator className="my-6 bg-white/10" />

              <Button asChild className="w-full bg-fuchsia-500 text-white hover:bg-fuchsia-400">
                <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer">
                  Hire / Connect on LinkedIn <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </Card>
          </div>

          <footer className="mt-10 pb-14 text-center text-xs text-white/45">
            © {new Date().getFullYear()} Imran Sabir • Built with React • Deployed on Vercel
          </footer>
        </Section>
      </main>
    </div>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Button asChild variant="ghost" className="h-9 px-3 text-white/80 hover:bg-white/10 hover:text-white">
      <Link href={to}>{children}</Link>
    </Button>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  );
}

function Section({
  id,
  title,
  kicker,
  right,
  children,
}: {
  id: string;
  title: string;
  kicker: string;
  right: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="pt-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-white/55">{kicker}</div>
            <h2 className="mt-2 font-display text-3xl text-white md:text-4xl">{title}</h2>
          </div>
          <div className="font-display text-4xl text-white/18 md:text-5xl">{right}</div>
        </div>

        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl md:p-8">
          <div className="pointer-events-none absolute -left-16 -bottom-12 h-40 w-[420px] rotate-[-10deg] bg-emerald-400/12 blur-2xl" />
          <div className="pointer-events-none absolute -right-14 -top-16 h-40 w-[420px] rotate-[12deg] bg-fuchsia-500/10 blur-2xl" />
          {children}
        </div>
      </div>
    </section>
  );
}

function MiniStat({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-white/60">{title}</div>
        <div className="text-white/70">{icon}</div>
      </div>
      <div className="mt-2 font-display text-lg text-white">{value}</div>
    </div>
  );
}

function InfoLine({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-white/70">
        <span className="text-white/70">{icon}</span>
        <span className="text-white/60">{label}</span>
      </div>
      <div className="text-sm text-white">{value}</div>
    </div>
  );
}

function SkillCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="border-white/10 bg-black/35 p-6">
      <h3 className="font-display text-xl text-white">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {items.map((it) => (
          <li key={it} className="flex items-center justify-between gap-3">
            <span>{it}</span>
            <span className="h-[6px] w-[6px] rounded-full bg-emerald-300/70" />
          </li>
        ))}
      </ul>
    </Card>
  );
}

function CopyLine({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
    >
      <div className="flex items-center gap-2">
        <span className="text-white/70">{icon}</span>
        <div>
          <div className="text-xs text-white/55">{label}</div>
          <div className="text-sm text-white">{value}</div>
        </div>
      </div>
      <span className="text-xs text-white/45 group-hover:text-white/70">Copy</span>
    </button>
  );
}

function SocialRow({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
    >
      <div className="flex items-center gap-2">
        <span className="text-white/80">{icon}</span>
        <span className="text-sm text-white">{label}</span>
      </div>
      <ExternalLink className="h-4 w-4 text-white/55" />
    </a>
  );
}
