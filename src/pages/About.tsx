import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { 
  ArrowRight, Award, Users, Target, Rocket, CheckCircle, 
  Calendar, Sparkles, Globe, TrendingUp, Heart, Shield,
  Code, Palette, Megaphone, Star, MapPin
} from "lucide-react";
import ceoPhoto from "@/assets/ceo-photo.jpg";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We are focused on delivering measurable results that truly matter to your business growth.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description: "Your success is our ultimate priority. We build lasting partnerships, not just projects.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to the highest quality standards in every project we undertake.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Embracing cutting-edge technologies to keep you ahead of the competition.",
    color: "from-purple-500 to-indigo-500",
  },
];

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Founded in Rangpur, Bangladesh with a vision to provide world-class digital services.",
    icon: Sparkles,
    color: "from-blue-500 to-cyan-500",
  },
  {
    year: "2021",
    title: "Growing Team",
    description: "Expanded our team to 10+ digital experts and completed 50+ successful projects.",
    icon: Users,
    color: "from-green-500 to-emerald-500",
  },
  {
    year: "2022",
    title: "Global Reach",
    description: "Star, MapPinted serving international clients from USA, UK, Canada, and Australia.",
    icon: Globe,
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2023",
    title: "Innovation Hub",
    description: "Launched AI-powered solutions and achieved 500+ completed projects milestone.",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
  },
  {
    year: "2024",
    title: "Industry Leader",
    description: "Recognized as Bangladesh's leading digital agency with 30+ team members.",
    icon: Award,
    color: "from-amber-500 to-yellow-500",
  },
  {
    year: "2025",
    title: "Future Vision",
    description: "Expanding services globally and building the next generation of digital solutions.",
    icon: TrendingUp,
    color: "from-cyan-500 to-blue-500",
  },
];

const stats = [
  { value: "850+", label: "Projects Completed", icon: Code },
  { value: "650+", label: "Happy Clients", icon: Users },
  { value: "5+", label: "Years Experience", icon: Calendar },
  { value: "30+", label: "Team Members", icon: Heart },
];

const expertise = [
  { icon: Code, label: "Web Development", projects: "250+" },
  { icon: Palette, label: "Graphic Design", projects: "400+" },
  { icon: Megaphone, label: "Digital Marketing", projects: "150+" },
  { icon: Globe, label: "SEO Services", projects: "50+" },
];

const About = () => {
  return (
    <>

      <div className="min-h-screen bg-background">
        
        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-slide-up">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">About TechCrafterIT</span>
                </div>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up animation-delay-100">
                  We Are The
                  <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    Digital Innovators
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-slide-up animation-delay-200">
                  A modern, technology-driven digital service company dedicated to 
                  delivering high-quality and professional digital solutions that 
                  transform businesses and create lasting impact.
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-slide-up animation-delay-300">
                {stats.map((stat, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative glass-card rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-20 relative">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">Our Story</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                    From Vision to
                    <span className="text-gradient block">Digital Reality</span>
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    Founded in Rangpur, Bangladesh, TechCrafterIT emerged from a vision 
                    to provide world-class digital services to businesses of all sizes. 
                    What started as a small team with big dreams has grown into a 
                    comprehensive digital agency serving clients across the globe.
                  </p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Our journey of over 5 years has been marked by continuous learning, 
                    innovation, and an unwavering commitment to excellence. We've had 
                    the privilege of partnering with diverse businesses, helping them 
                    navigate the digital landscape and achieve remarkable results.
                  </p>

                  {/* Expertise Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {expertise.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.projects} Projects</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CEO Card */}
                <div className="relative">
                  <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-[100px]" />
                  <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />

                  <div className="relative glass-card rounded-3xl p-10 text-center">
                    {/* Quote Mark */}
                    <div className="absolute top-6 left-6 text-8xl font-serif text-primary/10">"</div>
                    
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/30 mb-6 shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                      <img
                        src={ceoPhoto}
                        alt="Md Jakaria Hasan - CEO & Founder"
                        className="w-full h-full object-cover relative"
                      />
                    </div>
                    
                    <h3 className="font-display text-2xl font-bold mb-2">
                      Md Jakaria Hasan
                    </h3>
                    <p className="text-primary font-semibold mb-6 flex items-center justify-center gap-2">
                      <Award className="w-4 h-4" />
                      CEO & Founder
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-8 italic">
                      "Our mission is to empower businesses with digital solutions 
                      that drive real growth. Every project we undertake is a step 
                      towards making Bangladesh a hub for digital excellence."
                    </p>
                    
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>Rangpur, Bangladesh</span>
                      </div>
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star, MapPin key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Our Journey</span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                  The Story of
                  <span className="text-gradient"> Our Growth</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  From a small startup to Bangladesh's leading digital agency, 
                  here's how our journey has unfolded.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Center Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      className={`relative flex flex-col md:flex-row items-center gap-8 ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Content Card */}
                      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group">
                          <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-display font-bold text-primary">{item.year}</span>
                          </div>
                          <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>

                      {/* Center Dot */}
                      <div className="relative z-10 w-5 h-5 rounded-full bg-primary ring-4 ring-background hidden md:block">
                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                      </div>

                      {/* Spacer */}
                      <div className="flex-1 hidden md:block" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Our Values</span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                  What Drives Us
                  <span className="text-gradient"> Forward</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our core values shape everything we do and guide us in delivering 
                  exceptional results for our clients.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="group relative p-8 rounded-3xl glass-card hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg`}>
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-display text-xl font-bold mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient p-12 md:p-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] translate-x-32 -translate-y-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-x-16 translate-y-16" />
                
                <div className="relative max-w-3xl mx-auto text-center">
                  <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-primary-foreground">
                    Ready to Work With Us?
                  </h2>
                  <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
                    Let's discuss how we can help transform your business and achieve remarkable results together.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact">
                      <Button variant="white" size="xl" className="gap-3 shadow-lg">
                        Get In Touch
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/team">
                      <Button variant="outline" size="xl" className="gap-3 border-white/30 text-primary-foreground hover:bg-white/10">
                        <Users className="w-5 h-5" />
                        Meet Our Team
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
};

// Add missing import
import { MapPin } from "lucide-react";

export default About;
