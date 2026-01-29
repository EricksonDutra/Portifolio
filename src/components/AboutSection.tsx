import { motion } from "framer-motion";
import {
  Monitor,
  Server,
  Database,
  Cloud,
  Smartphone,
  Boxes,
} from "lucide-react";
import { useEffect, useState } from "react";

const GITHUB_USERNAME = "EricksonDutra";

/* =======================
   Data
======================= */

const stats = [
  { label: "Anos de Experiência", value: "5+" },
  { label: "Projetos Entregues", value: "30+" },
  { label: "Tecnologias", value: "15+" },
  { label: "Clientes Satisfeitos", value: "20+" },
];

const highlights = [
  {
    icon: Monitor,
    title: "Frontend",
    desc: "React, TypeScript, Tailwind, SCSS",
    color: "text-sky-400",
  },
  {
    icon: Server,
    title: "Backend",
    desc: "Node.js, Python, Java",
    color: "text-emerald-400",
  },
  {
    icon: Database,
    title: "Databases",
    desc: "PostgreSQL, MySQL, SQL Server",
    color: "text-violet-400",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    desc: "Docker, AWS, CI/CD",
    color: "text-orange-400",
  },
  {
    icon: Smartphone,
    title: "Mobile",
    desc: "Flutter, React Native",
    color: "text-pink-400",
  },
  {
    icon: Boxes,
    title: "Frameworks",
    desc: "Django, Flask, Spring, Next.js",
    color: "text-cyan-400",
  },
];

/* =======================
   Motion Variants
======================= */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const fadeSide = (direction: "left" | "right") => ({
  hidden: { opacity: 0, x: direction === "left" ? -32 : 32 },
  show: { opacity: 1, x: 0 },
});

/* =======================
   Component
======================= */

const AboutSection = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loadingAvatar, setLoadingAvatar] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setAvatarUrl(data.avatar_url ?? null))
      .catch(() => {})
      .finally(() => setLoadingAvatar(false));

    return () => controller.abort();
  }, []);

  return (
    <section id="about" className="relative py-24">
      <div className="container px-6 mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Desenvolvedor Full Stack com foco em soluções
            <span className="text-primary font-medium"> escaláveis</span>,
            <span className="text-accent font-medium"> seguras</span> e
            orientadas a resultados reais de negócio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div
            variants={fadeSide("left")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Avatar */}
            <div className="mb-8 flex justify-center">
              {loadingAvatar && (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-secondary animate-pulse" />
              )}

              {!loadingAvatar && avatarUrl && (
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-accent blur opacity-30 animate-pulse" />
                  <img
                    src={avatarUrl}
                    alt={`Foto de perfil de ${GITHUB_USERNAME}`}
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background object-cover shadow-xl"
                  />
                </div>
              )}
            </div>

            {/* Text */}
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Com mais de 5 anos de experiência em desenvolvimento de software,
              atuo na criação de aplicações web e mobile que unem
              <span className="text-primary font-medium">
                {" "}
                excelência técnica
              </span>{" "}
              com
              <span className="text-accent font-medium">
                {" "}
                experiência de usuário
              </span>
              .
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Minha jornada evoluiu da curiosidade para uma carreira focada em
              resolver problemas complexos através de código limpo, boas
              práticas e arquitetura bem definida.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 rounded-lg bg-secondary/50"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            variants={fadeSide("right")}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative p-6 rounded-xl bg-card gradient-border group border-border/50 hover:border-primary/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center ${item.color}`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
