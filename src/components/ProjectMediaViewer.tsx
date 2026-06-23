import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type { ProjectMedia } from "@/data/projectsEnrichment";

interface ProjectMediaViewerProps {
  media: ProjectMedia[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectMediaViewer = ({
  media,
  initialIndex,
  open,
  onOpenChange,
}: ProjectMediaViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setCurrentIndex(initialIndex);
  }, [open, initialIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1));
  }, [media.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0));
  }, [media.length]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, goToPrev, goToNext, onOpenChange]);

  if (media.length === 0) return null;

  const currentMedia = media[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] w-auto p-0 border-none bg-black/95 backdrop-blur-xl overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Visualizador de mídia do projeto</DialogTitle>
        </VisuallyHidden>

        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-4 z-50 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm font-mono">
          {currentIndex + 1} / {media.length}
        </div>

        {/* Media content */}
        <div className="relative flex items-center justify-center min-h-[50vh] max-h-[85vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center w-full h-full p-8"
            >
              {currentMedia.type === "video" ? (
                <video
                  src={currentMedia.src}
                  controls
                  autoPlay
                  className="max-w-full max-h-[80vh] rounded-lg"
                  aria-label={currentMedia.alt}
                >
                  Seu navegador não suporta a tag de vídeo.
                </video>
              ) : (
                <img
                  src={currentMedia.src}
                  alt={currentMedia.alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  loading="lazy"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {media.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110"
                aria-label="Mídia anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110"
                aria-label="Próxima mídia"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {media.length > 1 && (
          <div className="flex items-center justify-center gap-2 px-4 pb-4">
            {media.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-12 rounded-md overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? "border-primary ring-2 ring-primary/30 scale-110"
                    : "border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                {item.type === "video" ? (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectMediaViewer;
