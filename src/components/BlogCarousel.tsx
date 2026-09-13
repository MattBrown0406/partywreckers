import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { blogArticles } from "@/data/blogData";

const getArticleTimestamp = (date: string) => {
  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const BlogCarousel = () => {
  const recentArticles = useMemo(
    () =>
      [...blogArticles]
        .sort((a, b) => getArticleTimestamp(b.date) - getArticleTimestamp(a.date))
        .slice(0, 5),
    [],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: recentArticles.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedArticle = recentArticles[selectedIndex] || recentArticles[0];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || recentArticles.length < 2) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi, recentArticles.length]);

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {recentArticles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.id}`}
              className="relative block h-full min-w-0 flex-[0_0_100%]"
            >
              <img
                src={article.image}
                alt={article.imageAlt}
                className="h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />

      {selectedArticle && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-white/70">
            {selectedArticle.date}
          </p>
          <h3 className="line-clamp-3 text-lg font-semibold leading-tight text-white sm:text-xl">
            {selectedArticle.title}
          </h3>
          <p className="pointer-events-auto mt-2 text-sm font-medium text-primary">
            <Link to={`/blog/${selectedArticle.id}`} className="inline-flex min-h-6 items-center hover:underline">
              Read the full article
            </Link>
          </p>
        </div>
      )}

      {recentArticles.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
            aria-label="Previous article"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
            aria-label="Next article"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 gap-2">
            {recentArticles.map((article, index) => (
              <button
                key={article.id}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-6 w-6 rounded-full border-8 border-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                  index === selectedIndex ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Go to article ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogCarousel;
