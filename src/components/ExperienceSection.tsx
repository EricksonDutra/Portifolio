import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Desenvolvedor Fullstack",
    company: "Ciarama Máquinas",
    period: "2023 - atualmente",
    description: "Desenvolvimento de features com Flutter, integração de APIs e otimização de performance.",
  },
  {
    type: "work",
    title: "Desenvolvedor Power BI",
    company: "Ciarama Máquinas",
    period: "2022 - 2023",
    description: "Desenvolvimento de dashboards e relatórios interativos, modelagem de dados, análise de métricas e business intelligence.",
  },
  {
    type: "work",
    title: "Docente em tecnologia",
    company: "Senac MS",
    period: "2024 - atualmente",
    description: "Ministração de aulas no curso técnico em desenvolvimento de sistemas.",
  },
];

const education = [
  {
    title: "Pós-Graduação em Arquitetura de Software e Soluções",
    institution: "XP Educação",
    period: "2024 - 2024",
    description: "Especialização em padrões de arquitetura, microsserviços e cloud computing.",
  },
  {
    title: "Pós-Graduação em Gestão de Projetos",
    institution: "Conquer Business School",
    period: "2022 - 2023",
    description: "Especialização em gestão de projetos, com foco em metodologias ágeis e tradicionais, planejamento estratégico, gestão de riscos e entrega de resultados.",
  },
  {
    title: "Tecnologia em Análise e Desenvolvimento de Sistemas",
    institution: "Falculdades Anhanguera",
    period: "2020 - 2022",
    description: "Formação completa com foco em algoritmos, estruturas de dados e engenharia de software.",
  }
];

const TimelineItem = ({ 
  item, 
  index, 
  icon: Icon 
}: { 
  item: { title: string; period: string; description: string; company?: string; institution?: string }; 
  index: number; 
  icon: typeof Briefcase;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="relative pl-8 pb-8 last:pb-0"
  >
    {/* Timeline line */}
    <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
    
    {/* Timeline dot */}
    <div className="absolute left-0 top-1 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
      <Icon className="w-4 h-4 text-primary" />
    </div>

    <div className="ml-4">
      <span className="text-sm text-primary font-mono">{item.period}</span>
      <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
      <p className="text-muted-foreground font-medium">
        {item.company || item.institution}
      </p>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
        {item.description}
      </p>
    </div>
  </motion.div>
);

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-secondary/20">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experiência & <span className="gradient-text">Formação</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Minha trajetória profissional e acadêmica
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Professional Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Experiência Profissional</h3>
            </motion.div>
            
            <div className="space-y-0">
              {experiences.map((exp, index) => (
                <TimelineItem key={exp.title} item={exp} index={index} icon={Briefcase} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Formação Acadêmica</h3>
            </motion.div>
            
            <div className="space-y-0">
              {education.map((edu, index) => (
                <TimelineItem key={edu.title} item={edu} index={index} icon={GraduationCap} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
