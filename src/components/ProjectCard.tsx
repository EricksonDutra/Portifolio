import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Folder,
  Images,
  ChevronUp,
  Play,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import ProjectMediaViewer from "@/components/ProjectMediaViewer";
import type {
  ProjectMedia,
  ProjectCategory,
} from "@/data/projectsEnrichment";
import { CATEGORY_CONFIG } from "@/data/projectsEnrichment";

interface ProjectCardProps {
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

const CategoryBadge = ({ category }: { category: ProjectCategory }) => {
  const config = CATEGORY_CONFIG[category];
  return (
    <span className={`category-badge category-badge-${category}`}>
      {config.icon} {config.label}
    </span>
  );
};

const ProjectCard = ({
  title,
  description,
  tags,
  github,
  demo,
  featured,
  category,
  media,
  thumbnail,
}: ProjectCardProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const hasMedia = media.length > 0;
  const thumbnailSrc = thumbnail || (hasMedia && media[0].type === "image" ? media[0].src : null);
  const isVideoThumbnail = !thumbnail && hasMedia && media[0].type === "video";
  const hasThumbnail = !!thumbnailSrc || isVideoThumbnail;

  const openViewer = (index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className={`group relative rounded-xl overflow-hidden backdrop-blur-sm flex flex-col h-full ${
          featured
            ? "gradient-border bg-card/50"
            : "bg-card/40 border border-border/50 hover:border-primary/50 transition-colors"
        }`}
      >
        {/* Thumbnail / Header */}
        {hasThumbnail ? (
          <div
            className="relative aspect-video overflow-hidden cursor-pointer"
            onClick={() => hasMedia && (media.length > 1 ? setIsGalleryOpen(!isGalleryOpen) : openViewer(0))}
          >
            {isVideoThumbnail ? (
              <div className="relative w-full h-full bg-black/40 flex items-center justify-center">
                <video
                  src={media[0].src}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  muted
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/10">
                  <div className="p-3 rounded-full bg-primary/90 text-primary-foreground shadow-lg">
                    <Play className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={thumbnailSrc as string}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            )}
            <div className="media-overlay" />

            {/* Category badge */}
            <div className="absolute top-3 left-3 z-10">
              <CategoryBadge category={category} />
            </div>

            {/* Media count indicator */}
            {hasMedia && media.length > 1 && (
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/90 text-xs font-medium">
                <Images className="w-3.5 h-3.5" />
                {media.length}
              </div>
            )}
          </div>
        ) : (
          <div className="relative px-6 pt-6 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Folder className={`${featured ? "w-8 h-8" : "w-6 h-6"} text-primary`} />
              </div>
              <CategoryBadge category={category} />
            </div>
            <div className="flex gap-3">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Ver no GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Ver demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Content area */}
        <div className={`flex-1 flex flex-col ${featured ? "p-6" : "p-5"}`}>
          {/* Action links row (when thumbnail is present) */}
          {hasThumbnail && (
            <div className="flex items-center justify-between mb-3">
              <CategoryBadge category={category} />
              <div className="flex gap-3">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Ver no GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {demo && (
                  <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Ver demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          )}

          <h3
            className={`font-semibold mb-2 group-hover:text-primary transition-colors capitalize ${
              featured ? "text-xl" : "text-base"
            }`}
          >
            {title}
          </h3>

          <p
            className={`text-muted-foreground mb-4 leading-relaxed flex-grow ${
              featured ? "line-clamp-3" : "text-sm line-clamp-2"
            }`}
          >
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, featured ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className={`font-mono rounded-full border border-primary/20 ${
                  featured
                    ? "px-3 py-1 text-xs bg-secondary/50 text-primary"
                    : "px-2 py-0.5 text-[10px] text-muted-foreground border-border/50"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Gallery toggle button */}
          {hasMedia && media.length > 1 && (
            <button
              onClick={() => setIsGalleryOpen(!isGalleryOpen)}
              className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors mt-auto pt-2"
            >
              <Images className="w-4 h-4" />
              {isGalleryOpen ? "Fechar galeria" : "Ver galeria"}
              <ChevronUp
                className={`w-4 h-4 transition-transform duration-300 ${
                  isGalleryOpen ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
          )}
        </div>

        {/* Expandable carousel */}
        <AnimatePresence>
          {isGalleryOpen && hasMedia && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border/30"
            >
              <div className="p-4">
                <Carousel
                  opts={{ align: "start", loop: true }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2">
                    {media.map((item, idx) => (
                      <CarouselItem
                        key={idx}
                        className="pl-2 basis-full sm:basis-1/2"
                      >
                        <div
                          className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group/media"
                          onClick={() => openViewer(idx)}
                        >
                          {item.type === "video" ? (
                            <div className="relative w-full h-full bg-black/40 flex items-center justify-center">
                              <video
                                src={item.src}
                                className="w-full h-full object-cover"
                                muted
                                preload="metadata"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/media:bg-black/10 transition-colors">
                                <div className="p-3 rounded-full bg-primary/90 text-primary-foreground shadow-lg">
                                  <Play className="w-6 h-6" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover/media:scale-105"
                              loading="lazy"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover/media:bg-black/10 transition-colors rounded-lg" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {media.length > 2 && (
                    <>
                      <CarouselPrevious className="-left-3 h-8 w-8 bg-card/80 border-border/50 hover:bg-card" />
                      <CarouselNext className="-right-3 h-8 w-8 bg-card/80 border-border/50 hover:bg-card" />
                    </>
                  )}
                </Carousel>

                {/* Dot indicators */}
                <div className="carousel-dots mt-3">
                  {media.map((_, idx) => (
                    <button
                      key={idx}
                      className={`carousel-dot ${idx === 0 ? "active" : ""}`}
                      onClick={() => openViewer(idx)}
                      aria-label={`Ver mídia ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox viewer */}
      {hasMedia && (
        <ProjectMediaViewer
          media={media}
          initialIndex={viewerIndex}
          open={viewerOpen}
          onOpenChange={setViewerOpen}
        />
      )}
    </>
  );
};

export default ProjectCard;
