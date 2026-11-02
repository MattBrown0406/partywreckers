import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import family1 from "@/assets/hopeful-family-1.jpg";
import family2 from "@/assets/hopeful-family-2.jpg";
import family3 from "@/assets/hopeful-family-3.jpg";
import family4 from "@/assets/hopeful-family-4.jpg";
import family5 from "@/assets/hopeful-family-5.jpg";

const images = [
  { src: family1, alt: "Family embracing during addiction recovery journey, showing hope and support" },
  { src: family2, alt: "Parents and children sharing a moment of connection after intervention success" },
  { src: family3, alt: "Multi-generational family united in supporting loved one through recovery" },
  { src: family4, alt: "Couple holding hands, symbolizing partnership in overcoming addiction together" },
  { src: family5, alt: "Family celebrating sobriety milestone with genuine smiles and togetherness" },
];

const FamilyCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
      {/* Carousel */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 h-full relative">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dark gradient overlay on bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />

      {/* Text overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-center pointer-events-none">
        <p className="font-script text-3xl sm:text-4xl text-white mb-1">
          Your Family Is Not Crazy
        </p>
        <p className="text-white/80 text-sm uppercase tracking-widest">
          You Need Clarity, Support, and a Better Plan
        </p>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

    </div>
  );
};

export default FamilyCarousel;
