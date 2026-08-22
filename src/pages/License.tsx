import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, ShieldCheck, Award, CheckCircle2 } from "lucide-react";
import licenseUsa from "@/assets/license-usa.png.asset.json";
import licenseUk from "@/assets/license-uk.png.asset.json";
import licenseAll from "@/assets/license-all.png.asset.json";

const LicensePage = () => {
  return (
    <div className="min-h-screen bg-[#011612] text-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              Next Online <span className="text-primary">All License</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our commitment to global standards and legal compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Left Column: License Images */}
            <div className="space-y-8">
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-4 transition-all duration-300 hover:border-primary/30">
                <img 
                  src={licenseAll.url} 
                  alt="Next Online All License" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-white/80">Full License Overview</span>
                  <Award className="w-5 h-5 text-primary" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-4 transition-all duration-300 hover:border-primary/30">
                  <img 
                    src={licenseUsa.url} 
                    alt="USA Certificate of Organization" 
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="mt-3 text-xs font-bold text-center text-white/70">USA Certificate</p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-4 transition-all duration-300 hover:border-primary/30">
                  <img 
                    src={licenseUk.url} 
                    alt="UK Certificate of Incorporation" 
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="mt-3 text-xs font-bold text-center text-white/70">UK Certificate</p>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="space-y-8">
              {/* USA Section */}
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck className="w-20 h-20 text-primary" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl" role="img" aria-label="USA Flag">🇺🇸</span>
                    <h2 className="text-2xl font-bold font-heading">USA Registration</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="font-medium text-lg">Next Online LLC</p>
                    </div>
                    <div className="pl-8 space-y-2">
                      <p className="text-white/60">Certificate of Organization</p>
                      <p className="text-primary font-bold tracking-wider">LLC License No: 7114745</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* UK Section */}
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FileText className="w-20 h-20 text-primary" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl" role="img" aria-label="UK Flag">🇬🇧</span>
                    <h2 className="text-2xl font-bold font-heading">UK Registration</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="font-medium text-lg">NEXT ONLINE GLOBAL LTD</p>
                    </div>
                    <div className="pl-8 space-y-2">
                      <p className="text-white/60">Certificate of Incorporation (Private Limited Company)</p>
                      <p className="text-primary font-bold tracking-wider">UK Limited License No: 14710199</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bangladesh Section */}
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Award className="w-20 h-20 text-primary" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl" role="img" aria-label="Bangladesh Flag">🇧🇩</span>
                    <h2 className="text-2xl font-bold font-heading">Bangladesh Registration</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="font-medium text-lg">Next Online LLC</p>
                    </div>
                    <div className="pl-8 space-y-2">
                      <p className="text-white/60">Bangladesh Proprietorship Company</p>
                      <p className="text-primary font-bold tracking-wider">Trade License NO: TRAD/DSCC/044014/2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Text */}
          <div className="text-center text-white/40 text-sm max-w-3xl mx-auto border-t border-white/5 pt-12">
            <p>
              Next Online LLC is committed to transparency and compliance in every jurisdiction we operate. 
              These documents certify our legal existence and right to perform business activities globally.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
};

export default LicensePage;
