import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - TechCrafterIT</title>
        <meta
          name="description"
          content="Read TechCrafterIT's privacy policy to understand how we collect, use, and protect your personal information."
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
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold">Privacy Policy</h1>
                  <p className="text-muted-foreground">Last updated: January 1, 2026</p>
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-16">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto prose prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground prose-li:text-muted-foreground">
                <h2>1. Introduction</h2>
                <p>
                  Welcome to TechCrafterIT ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>

                <h2>2. Information We Collect</h2>
                <h3>Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide, including:</p>
                <ul>
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Company name and job title</li>
                  <li>Payment and billing information</li>
                  <li>Project requirements and communications</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>When you visit our website, we automatically collect:</p>
                <ul>
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website addresses</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>We use the collected information for:</p>
                <ul>
                  <li>Providing and improving our services</li>
                  <li>Communicating with you about projects and updates</li>
                  <li>Processing payments and managing accounts</li>
                  <li>Sending marketing communications (with your consent)</li>
                  <li>Analyzing website usage and improving user experience</li>
                  <li>Complying with legal obligations</li>
                </ul>

                <h2>4. Information Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                </p>
                <ul>
                  <li>Service providers who assist in our operations</li>
                  <li>Professional advisors (lawyers, accountants)</li>
                  <li>Government authorities when required by law</li>
                </ul>

                <h2>5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>

                <h2>6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>

                <h2>7. Cookies</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie preferences through your browser settings.
                </p>

                <h2>8. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
                </p>

                <h2>9. Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
                </p>

                <h2>10. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                  If you have questions about this privacy policy or our data practices, please contact us at:
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

export default PrivacyPolicy;
