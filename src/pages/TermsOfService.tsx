import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router";
import { FileText, ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - TechCrafterIT</title>
        <meta
          name="description"
          content="Read TechCrafterIT's terms of service governing the use of our website and digital services."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24">
          {/* Hero */}
          <section className="py-16 bg-secondary/30 border-b border-border">
            <div className="container-custom">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold">Terms of Service</h1>
                  <p className="text-muted-foreground">Last updated: January 1, 2026</p>
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-16">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto prose prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground prose-li:text-muted-foreground">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using TechCrafterIT's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>

                <h2>2. Services Description</h2>
                <p>
                  TechCrafterIT provides digital services including but not limited to web design, web development, graphic design, video editing, digital marketing, and SEO optimization. The specific scope of services will be defined in individual project agreements.
                </p>

                <h2>3. User Responsibilities</h2>
                <p>As a user of our services, you agree to:</p>
                <ul>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of any account credentials</li>
                  <li>Notify us immediately of any unauthorized use</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not interfere with or disrupt our services</li>
                </ul>

                <h2>4. Intellectual Property</h2>
                <h3>Our Content</h3>
                <p>
                  All content on our website, including text, graphics, logos, and software, is the property of TechCrafterIT and is protected by intellectual property laws.
                </p>
                <h3>Client Work</h3>
                <p>
                  Upon full payment, clients receive ownership of the final deliverables as specified in the project agreement. We retain the right to display completed work in our portfolio unless otherwise agreed.
                </p>

                <h2>5. Payment Terms</h2>
                <ul>
                  <li>Payment terms will be specified in individual project proposals</li>
                  <li>A deposit may be required before work commences</li>
                  <li>All prices are in USD unless otherwise specified</li>
                  <li>Late payments may incur additional fees</li>
                  <li>Work may be paused for overdue payments</li>
                </ul>

                <h2>6. Project Timeline</h2>
                <p>
                  Project timelines are estimates based on the agreed scope. Delays caused by client-side issues (delayed feedback, content delivery, etc.) may extend the timeline. We will communicate any significant delays promptly.
                </p>

                <h2>7. Revisions and Changes</h2>
                <p>
                  The number of revisions included in a project will be specified in the proposal. Additional revisions or scope changes may incur extra charges. Major scope changes require a new agreement.
                </p>

                <h2>8. Confidentiality</h2>
                <p>
                  We treat all client information as confidential. We will not disclose your business information to third parties without your consent, except as required by law.
                </p>

                <h2>9. Limitation of Liability</h2>
                <p>
                  TechCrafterIT shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid for the specific service.
                </p>

                <h2>10. Warranty Disclaimer</h2>
                <p>
                  Our services are provided "as is" without warranties of any kind. We do not guarantee that our services will be error-free, uninterrupted, or meet all your requirements.
                </p>

                <h2>11. Termination</h2>
                <p>
                  Either party may terminate a project with written notice. Upon termination, you agree to pay for all work completed up to the termination date. We may terminate services for breach of these terms.
                </p>

                <h2>12. Governing Law</h2>
                <p>
                  These terms shall be governed by the laws of Bangladesh. Any disputes shall be resolved in the courts of Bangladesh.
                </p>

                <h2>13. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
                </p>

                <h2>14. Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us:
                </p>
                <ul>
                  <li>Email: info@techcrafterit.com</li>
                  <li>Phone: +880 1731-173992</li>
                  <li>Address: Hatibandha, Lalmonirhat, Rangpur, Bangladesh</li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;
