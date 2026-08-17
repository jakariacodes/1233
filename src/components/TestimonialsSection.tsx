import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  {
    id: 1,
    name: "Mohammad Rahman",
    role: "CEO, TechVenture BD",
    avatar: "MR",
    rating: 5,
    review: "TechCrafterIT transformed our online presence completely. Their web development team delivered a stunning e-commerce platform that increased our sales by 150%. Highly recommended!",
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
    review: "Professional, creative, and always on time. TechCrafterIT built our entire brand identity from scratch - logo, website, and marketing materials. Exceptional quality!",
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
    review: "The SEO optimization TechCrafterIT did for our website brought us to the first page of Google. Our organic traffic increased by 400%. Amazing results!",
  },
  {
    id: 6,
    name: "Nadia Islam",
    role: "CEO, HealthCare Plus",
    avatar: "NI",
    rating: 5,
    review: "From concept to launch, TechCrafterIT was with us every step. Their video editing for our promotional campaigns was cinema-quality. Truly impressed!",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating
              ? "fill-amber-400 text-amber-400"
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

  // Auto-scroll
  useEffect(() => {
    if (!emblaApi) return;
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
      {/* Background Elements */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-morph" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-morph animation-delay-2000" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="section-badge mb-4 animate-slide-up hover:scale-105 transition-transform cursor-default">
              Testimonials
            </span>
            <h2 className="section-title mb-6 animate-slide-up animation-delay-100">
              What Our <span className="text-gradient-animated">Clients Say</span>
            </h2>
            <p className="section-subtitle animate-slide-up animation-delay-200">
              Don't just take our word for it. Here's what our valued clients 
              have to say about working with TechCrafterIT.
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-3 animate-slide-up animation-delay-300">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full w-12 h-12 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full w-12 h-12 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <div className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 h-full flex flex-col hover:-translate-y-2 overflow-hidden relative">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    {/* Quote Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg relative z-10">
                      <Quote className="w-7 h-7 text-white" />
                    </div>

                    {/* Rating */}
                    <div className="relative z-10">
                      <StarRating rating={testimonial.rating} />
                    </div>

                    {/* Review Text */}
                    <p className="text-foreground/80 mt-5 mb-8 flex-grow leading-relaxed text-lg relative z-10 group-hover:text-foreground transition-colors duration-300">
                      "{testimonial.review}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-border relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg group-hover:text-primary transition-colors duration-300">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-primary w-10"
                    : "bg-muted-foreground/20 w-2.5 hover:bg-muted-foreground/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 p-8 rounded-3xl bg-card border border-border hover:border-primary/20 transition-all duration-500">
          {[
            { value: "100%", label: "Client Satisfaction" },
            { value: "650+", label: "Happy Clients" },
            { value: "4.9", label: "Average Rating" },
            { value: "98%", label: "Repeat Customers" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center animate-slide-up group cursor-default"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};