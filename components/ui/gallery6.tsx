"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

export interface Gallery6Props {
  heading?: string;
  tagline?: string;
  demoUrl?: string;
  items?: GalleryItem[];
}

const Gallery6 = ({
  heading = "Gallery",
  tagline,
  demoUrl = "#",
  items = [
    {
      id: "item-1",
      title: "Build Modern UIs",
      summary:
        "Create stunning user interfaces with our comprehensive design system.",
      url: "#",
      image: "/images/block/placeholder-dark-1.svg",
    },
  ],
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-6 bg-[#FFF6F7]">
      <div className="container max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="mb-4 flex flex-col justify-between md:mb-6 md:flex-row md:items-end">
          <div className="flex flex-col items-start">
            {tagline && (
              <span className="font-script font-bold text-[#D38E93] text-[30px] lg:text-[34px] leading-none mb-1">
                {tagline}
              </span>
            )}
            <h2 className="mb-1 text-xl md:text-[22px] lg:text-[24px] font-bodoni font-bold text-[#6D4C4E] uppercase tracking-normal leading-tight">
              {heading}
            </h2>
            <a
              href={demoUrl}
              className="group flex items-center gap-1 text-[11px] font-medium md:text-xs text-[#C17F78] uppercase tracking-widest hover:text-[#6D4C4E] transition-colors"
            >
              Shop All
              <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-4 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="h-8 w-8 disabled:pointer-events-auto border-[#E0B4B8] hover:bg-[#C17F78] hover:text-white transition-colors"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="h-8 w-8 disabled:pointer-events-auto border-[#E0B4B8] hover:bg-[#C17F78] hover:text-white transition-colors"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-8">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative"
        >
          {/* Constrain total height of carousel items */}
          <CarouselContent className="-ml-4 h-[320px]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 basis-[60%] sm:basis-1/3 md:basis-1/4 lg:basis-[20%]">
                <a
                  href={item.url}
                  className="group flex flex-col justify-between h-full bg-white rounded-xl overflow-hidden border border-[#E0B4B8]/30 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Fixed height image container */}
                    <div className="flex h-[180px] overflow-clip bg-[#FFE9EC]">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-center transition duration-500 group-hover:scale-105">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-3 flex flex-col h-[140px]">
                    <div className="mb-1.5 line-clamp-1 break-words text-[13px] font-playfair font-semibold text-[#6D4C4E] md:text-sm">
                      {item.title}
                    </div>
                    <div className="mb-3 line-clamp-2 text-[10px] font-raleway font-medium text-[#a37c76] leading-snug flex-grow">
                      {item.summary}
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#C17F78] border-t border-[#E0B4B8]/20 pt-2.5">
                      View Details
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Gallery6 };
