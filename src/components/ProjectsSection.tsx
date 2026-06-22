import { motion } from "framer-motion";
import { ExternalLink, Github, Folder, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
}

const GITHUB_USERNAME = "EricksonDutra";

// 📌 Adicione aqui os nomes exatos dos repositórios que você quer destacar (seus pinned repos)
const PINNED_REPOS = [
  "sggm_mobile",
  "Site-Agro-Company",
  "AproveRevalida",
  "Portifolio",
];

const fetchPinnedRepos = async (): Promise<GitHubRepo[]> => {
  if (PINNED_REPOS.length === 0) return [];

  const promises = PINNED_REPOS.map(async (repoName) => {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
    if (!response.ok) {
      console.warn(`Repositório não encontrado ou erro na API: ${repoName}`);
      return null;
    }
    return response.json();
  });

  const results = await Promise.all(promises);
  // Retorna apenas os que deram sucesso (não nulos)
  return results.filter((repo): repo is GitHubRepo => repo !== null);
};

const ProjectsSection = () => {
  const { data: repos, isLoading, isError } = useQuery({
    queryKey: ['github-pinned-repos'],
    queryFn: fetchPinnedRepos,
  });

  const projects = repos?.map((repo, index) => ({
    title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
    description: repo.description || "Sem descrição disponível. Visite o repositório para mais detalhes.",
    tags: Array.from(new Set([repo.language, ...repo.topics].filter(Boolean))) as string[],
    github: repo.html_url,
    demo: repo.homepage && repo.homepage !== "" ? repo.homepage : null,
    featured: index < 2, // Os dois primeiros da sua lista ficarão em destaque
  })) || [];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma seleção dos meus projetos fixados no GitHub.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
            <p>Carregando projetos em destaque...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-destructive">
            <p>Erro ao carregar repositórios do GitHub. Tente novamente mais tarde.</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-card/30 rounded-xl border border-border/50 backdrop-blur-sm max-w-2xl mx-auto">
            <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum projeto configurado</h3>
            <p className="text-muted-foreground mb-6">
              Adicione os nomes dos seus repositórios na constante <code className="bg-muted px-1.5 py-0.5 rounded text-sm">PINNED_REPOS</code> no arquivo <code className="bg-muted px-1.5 py-0.5 rounded text-sm">ProjectsSection.tsx</code>.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            {projects.filter(p => p.featured).length > 0 && (
              <div className="grid lg:grid-cols-2 gap-6 mb-12">
                {projects.filter(p => p.featured).map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group relative p-8 rounded-xl gradient-border overflow-hidden bg-card/50 backdrop-blur-sm"
                  >
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <Folder className="w-10 h-10 text-primary" />
                        <div className="flex gap-3">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors">
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors">
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors capitalize">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-mono bg-secondary/50 text-primary border border-primary/20 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Other Projects Grid */}
            {projects.filter(p => !p.featured).length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {projects.filter(p => !p.featured).map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group p-6 rounded-xl bg-card/40 border border-border/50 hover:border-primary/50 transition-colors flex flex-col h-full backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Folder className="w-8 h-8 text-primary" />
                      <div className="flex gap-3">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors capitalize line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] font-mono text-muted-foreground border border-border/50 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild className="hover:border-primary hover:text-primary transition-colors">
            <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Ver todos no GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
