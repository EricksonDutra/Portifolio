import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/ProjectCard";
import {
  projectsEnrichment,
  DEFAULT_CATEGORY,
  CATEGORY_CONFIG,
  type ProjectCategory,
  type ProjectMedia,
} from "@/data/projectsEnrichment";

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

const PINNED_REPOS = [
  "sggm_mobile",
  "Site-Agro-Company",
  "AproveRevalida",
  "Portifolio",
  "TVSENACPP",
  "VCOS",
];

const fetchPinnedRepos = async (): Promise<GitHubRepo[]> => {
  if (PINNED_REPOS.length === 0) return [];

  const promises = PINNED_REPOS.map(async (repoName) => {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
    if (response.status === 403) {
      throw new Error("Limite de requisições da API do GitHub atingido. Aguarde alguns minutos.");
    }
    if (!response.ok) {
      console.warn(`Repositório não encontrado ou erro na API: ${repoName} (${response.status})`);
      return null;
    }
    return response.json();
  });

  const results = await Promise.all(promises);
  return results.filter((repo): repo is GitHubRepo => repo !== null);
};

type FilterValue = "all" | ProjectCategory;

const FILTER_OPTIONS: { value: FilterValue; label: string; icon: string }[] = [
  { value: "all", label: "Todos", icon: "🔥" },
  { value: "web", label: CATEGORY_CONFIG.web.label, icon: CATEGORY_CONFIG.web.icon },
  { value: "mobile", label: CATEGORY_CONFIG.mobile.label, icon: CATEGORY_CONFIG.mobile.icon },
  { value: "backend", label: CATEGORY_CONFIG.backend.label, icon: CATEGORY_CONFIG.backend.icon },
];

interface EnrichedProject {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string | null;
  featured: boolean;
  category: ProjectCategory;
  media: ProjectMedia[];
  thumbnail?: string;
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const { data: repos, isLoading, isError } = useQuery({
    queryKey: ['github-pinned-repos'],
    queryFn: fetchPinnedRepos,
    staleTime: 10 * 60 * 1000, // 10 minutos — evita chamadas desnecessárias à API
    retry: 1,
    retryDelay: 5000,
  });

  // Merge GitHub data with local enrichment
  const projects: EnrichedProject[] = useMemo(() => {
    if (!repos) return [];

    return repos.map((repo, index) => {
      const enrichment = projectsEnrichment[repo.name];

      return {
        id: repo.id,
        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
        description: repo.description || "Sem descrição disponível. Visite o repositório para mais detalhes.",
        tags: Array.from(new Set([repo.language, ...repo.topics].filter(Boolean))) as string[],
        github: repo.html_url,
        demo: repo.homepage && repo.homepage !== "" ? repo.homepage : null,
        featured: index < 2,
        category: enrichment?.category || DEFAULT_CATEGORY,
        media: enrichment?.media || [],
        thumbnail: enrichment?.thumbnail,
      };
    });
  }, [repos]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  // Check which categories have projects
  const availableCategories = useMemo(() => {
    const categories = new Set(projects.map((p) => p.category));
    return FILTER_OPTIONS.filter(
      (opt) => opt.value === "all" || categories.has(opt.value as ProjectCategory)
    );
  }, [projects]);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container px-6 relative z-10">
        {/* Header */}
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
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Uma seleção dos meus projetos fixados no GitHub.
          </p>

          {/* Filter tabs */}
          {projects.length > 0 && availableCategories.length > 2 && (
            <Tabs
              value={activeFilter}
              onValueChange={(v) => setActiveFilter(v as FilterValue)}
              className="inline-flex"
            >
              <TabsList className="project-filter-tabs h-auto">
                {availableCategories.map((filter) => (
                  <TabsTrigger
                    key={filter.value}
                    value={filter.value}
                    className="project-filter-tab"
                  >
                    <span className="mr-1.5">{filter.icon}</span>
                    {filter.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </motion.div>

        {/* Content */}
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
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 text-muted-foreground"
          >
            <p className="text-lg">Nenhum projeto nesta categoria ainda.</p>
            <button
              onClick={() => setActiveFilter("all")}
              className="mt-3 text-primary hover:underline text-sm"
            >
              Ver todos os projetos
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Featured Projects */}
              {featuredProjects.length > 0 && (
                <div className="grid lg:grid-cols-2 gap-6 mb-12">
                  {featuredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      description={project.description}
                      tags={project.tags}
                      github={project.github}
                      demo={project.demo}
                      featured={true}
                      category={project.category}
                      media={project.media}
                      thumbnail={project.thumbnail}
                    />
                  ))}
                </div>
              )}

              {/* Other Projects Grid */}
              {otherProjects.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      description={project.description}
                      tags={project.tags}
                      github={project.github}
                      demo={project.demo}
                      featured={false}
                      category={project.category}
                      media={project.media}
                      thumbnail={project.thumbnail}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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
