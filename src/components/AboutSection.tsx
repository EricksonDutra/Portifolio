import { motion } from "framer-motion";
import { Code2, Database, Globe, Layers } from "lucide-react";

const stats = [
  { label: "Anos de Experiência", value: "5+" },
  { label: "Projetos Entregues", value: "30+" },
  { label: "Tecnologias", value: "15+" },
  { label: "Clientes Satisfeitos", value: "20+" },
];

const highlights = [
  { icon: Globe, title: "Frontend", desc: "React, Vue, Next.js" },
  { icon: Database, title: "Backend", desc: "Node.js, Python, Java" },
  { icon: Layers, title: "DevOps", desc: "Docker, AWS, CI/CD" },
  { icon: Code2, title: "Databases", desc: "PostgreSQL, MongoDB" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desenvolvedor apaixonado por criar soluções que fazem a diferença
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Com mais de 5 anos de experiência em desenvolvimento de software, 
              tenho me dedicado a criar aplicações web e mobile que combinam 
              <span className="text-primary font-medium"> excelência técnica</span> com 
              <span className="text-accent font-medium"> experiência de usuário excepcional</span>.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Minha jornada começou com curiosidade e evoluiu para uma carreira 
              focada em resolver problemas complexos através de código limpo e 
              arquitetura bem planejada.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 rounded-lg bg-secondary/50"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skill Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                className="p-6 rounded-xl gradient-border group cursor-pointer"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
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
