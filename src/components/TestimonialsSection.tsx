import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  {
    id: 1,
    name: "Mohammad Rahman",
    role: "CEO, TechVenture BD",
    avatar: "MR",
    rating: 5,
    review: "NextOnline Technology transformed our online presence completely. Their web development team delivered a stunning e-commerce platform that increased our sales by 150%. Highly recommended!",
  },
  {
    id: 2,
    name: "Fatima Ahmed",
    role: "Marketing Director, GreenLife",
    avatar: "FA",
    rating: 5,
    review: "The digital marketing strategies they implemented were game-changing. Our social media engagement grew by 300% and we saw real business results within 3 months.",
  },
  {
    id: 3,
    name: "Abdul Karim",
    role: "Founder, StartupHub",
    avatar: "AK",
    rating: 5,
    review: "Professional, creative, and always on time. NextOnline Technology built our entire brand identity from scratch - logo, website, and marketing materials. Exceptional quality!",
  },
  {
    id: 4,
    name: "Sarah Khan",
    role: "Owner, Fashion Express",
    avatar: "SK",
    rating: 5,
    review: "Their graphic design work is outstanding. The branding package they created perfectly captured our vision. Our customers constantly compliment our new look!",
  },
  {
    id: 5,
    name: "Imran Hossain",
    role: "Director, EduTech Solutions",
    avatar: "IH",
    rating: 5,
    review: "The SEO optimization NextOnline Technology did for our website brought us to the first page of Google. Our organic traffic increased by 400%. Amazing results!",
  },
  {
    id: 6,
    name: "Nadia Islam",
    role: "CEO, HealthCare Plus",
    avatar: "NI",
    rating: 5,
    review: "From concept to launch, NextOnline Technology was with us every step. Their video editing for our promotional campaigns was cinema-quality. Truly impressed!",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
};

export const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

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
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 mb-20">
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 tracking-tight leading-tight">
              Trusted by Hundreds of <span className="text-primary">Industry Leaders</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Real results for real businesses. See how NextOnline Technology 
              has helped our clients scale their digital presence.
            </p>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-2xl w-14 h-14 border-border hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-2xl w-14 h-14 border-border hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <div className="group bg-white rounded-[2.5rem] p-10 border border-border hover:border-primary/50 transition-all duration-500 h-full flex flex-col hover:-translate-y-4 hover:shadow-2xl relative">
                    <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors" />
                    
                    <div className="mb-6">
                      <StarRating rating={testimonial.rating} />
                    </div>

                    <p className="text-foreground/80 mb-10 flex-grow leading-relaxed text-lg font-medium italic">
                      "{testimonial.review}"
                    </p>

                    <div className="flex items-center gap-5 pt-8 border-t border-border">
                      <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary font-bold text-xl border border-border group-hover:bg-primary group-hover:text-white transition-all">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-xl mb-1 tracking-tight">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-primary w-12"
                    : "bg-border w-2 hover:bg-primary/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
