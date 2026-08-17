import { Button } from "@;
import { Input } from "@;
import { Textarea } from "@;
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Upload,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const openPositions = [
  {
    title: "Senior Web Developer",
    type: "Full-Time",
    location: "Remote / Rangpur",
    description:
      "We're looking for an experienced web developer to join our growing team.",
    requirements: [
      "3+ years of experience",
      "React & Node.js proficiency",
      "Strong problem-solving skills",
    ],
  },
  {
    title: "UI/UX Designer",
    type: "Full-Time",
    location: "Remote / Rangpur",
    description:
      "Join us to create stunning user experiences for our diverse client base.",
    requirements: [
      "2+ years of design experience",
      "Proficiency in Figma",
      "Strong portfolio required",
    ],
  },
  {
    title: "Digital Marketing Specialist",
    type: "Full-Time",
    location: "Remote",
    description:
      "Help our clients grow their online presence through strategic marketing.",
    requirements: [
      "Experience with SEO/SEM",
      "Social media expertise",
      "Analytics proficiency",
    ],
  },
];

const Careers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    portfolio: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted! We'll review and get back to you.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      portfolio: "",
      message: "",
    });
  };

  return (
    <>

      <div className="min-h-screen bg-background">

        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
                  Careers
                </span>
                <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                  Join Our
                  <span className="text-gradient block mt-2">Amazing Team</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Be part of a dynamic team shaping the future of digital
                  innovation in Bangladesh.
                </p>
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Open Positions
                </h2>
                <p className="text-muted-foreground text-lg">
                  Explore current opportunities to join our team
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {openPositions.map((position, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-1">
                          {position.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {position.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {position.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {position.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {position.requirements.map((req, rIndex) => (
                        <div
                          key={rIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{req}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full gap-2">
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Application Form */}
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl font-bold mb-4">
                    Apply Now
                  </h2>
                  <p className="text-muted-foreground">
                    Submit your application and let's start a conversation
                  </p>
                </div>

                <div className="glass-card rounded-3xl p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="bg-secondary/50 border-border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="bg-secondary/50 border-border"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="+880 1XXX-XXXXXX"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                          className="bg-secondary/50 border-border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Position Applying For
                        </label>
                        <Input
                          type="text"
                          placeholder="Web Developer"
                          value={formData.position}
                          onChange={(e) =>
                            setFormData({ ...formData, position: e.target.value })
                          }
                          required
                          className="bg-secondary/50 border-border"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Years of Experience
                        </label>
                        <Input
                          type="text"
                          placeholder="3 years"
                          value={formData.experience}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              experience: e.target.value,
                            })
                          }
                          required
                          className="bg-secondary/50 border-border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Portfolio/LinkedIn URL
                        </label>
                        <Input
                          type="url"
                          placeholder="https://..."
                          value={formData.portfolio}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              portfolio: e.target.value,
                            })
                          }
                          className="bg-secondary/50 border-border"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Cover Letter / Message
                      </label>
                      <Textarea
                        placeholder="Tell us about yourself and why you'd be a great fit..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        rows={5}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    <Button variant="hero" size="lg" className="w-full gap-2">
                      <Upload className="w-4 h-4" />
                      Submit Application
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
};

export default Careers;
