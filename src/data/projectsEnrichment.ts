export type ProjectCategory = "web" | "mobile" | "backend";

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface ProjectEnrichment {
  category: ProjectCategory;
  media: ProjectMedia[];
  thumbnail?: string;
}

/**
 * Mapa de enriquecimento dos projetos.
 * Chave = nome exato do repositório no GitHub (case-sensitive).
 *
 * Para adicionar mídia a um projeto:
 * 1. Coloque suas imagens/vídeos em public/projects/<nome-do-projeto>/
 * 2. Adicione as entradas no array `media` abaixo
 *
 * Exemplo:
 *   media: [
 *     { type: "image", src: "/projects/sggm-mobile/screen1.png", alt: "Tela inicial" },
 *     { type: "video", src: "/projects/sggm-mobile/demo.mp4", alt: "Demo do app" },
 *   ],
 *   thumbnail: "/projects/sggm-mobile/thumbnail.png",
 */
export const projectsEnrichment: Record<string, ProjectEnrichment> = {
  sggm_mobile: {
    category: "mobile",
    media: [
      // Adicione suas mídias aqui:
      { type: "image", src: "/projects/sggm-mobile/sggm.jpeg", alt: "Tela inicial" },
      { type: "image", src: "/projects/sggm-mobile/sggm2.jpeg", alt: "Tela inicial" },

    ],
  },
  AproveRevalida: {
    category: "web",
    media: [
      { type: "image", src: "/projects/aprove-revalida/apr.gif", alt: "Tela inicial" },
    ],
  },
  "Site-Agro-Company": {
    category: "web",
    media: [
      { type: "image", src: "/projects/site-agro-company/agc1.png", alt: "Página inicial" },
      { type: "image", src: "/projects/site-agro-company/agc2.png", alt: "Página inicial" },
      { type: "image", src: "/projects/site-agro-company/agc3.png", alt: "Página inicial" },
    ],
  },
  Portifolio: {
    category: "web",
    media: [
      { type: "image", src: "/projects/portifolio/p1.png", alt: "Hero section" },
      { type: "image", src: "/projects/portifolio/p2.png", alt: "Hero section" },
    ],
  },
  TVSENACPP: {
    category: "web",
    media: [
      { type: "image", src: "/projects/tv-senac-pp/TVSENACPP.png", alt: "Site" },
      { type: "image", src: "/projects/tv-senac-pp/TVSENACPP2.png", alt: "Site" },
      { type: "image", src: "/projects/tv-senac-pp/TVSENACPP3.png", alt: "Site" },
    ],
    thumbnail: "/projects/tv-senac-pp/TVSENACPP.png",
  },
  VCOS: {
    category: "mobile",
    media: [
      { type: "video", src: "/projects/vcos/vcos.mp4", alt: "app vcos" },
    ],
  }



};

/** Categoria padrão para projetos sem enriquecimento configurado */
export const DEFAULT_CATEGORY: ProjectCategory = "web";

/** Labels e ícones para exibição das categorias */
export const CATEGORY_CONFIG: Record<
  ProjectCategory,
  { label: string; icon: string }
> = {
  web: { label: "Web", icon: "🌐" },
  mobile: { label: "Mobile", icon: "📱" },
  backend: { label: "Backend/API", icon: "⚙️" },
};
