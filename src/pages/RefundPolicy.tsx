import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { RefreshCw, ArrowLeft, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

const RefundPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Refund Policy - TechCrafterIT</title>
        <meta
          name="description"
          content="Read TechCrafterIT's refund policy to understand our refund terms and conditions for our digital services."
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
                  <RefreshCw className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold">Refund Policy</h1>
                  <p className="text-muted-foreground">Last updated: January 1, 2026</p>
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-16">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                {/* Important Notice */}
                <div className="flex gap-4 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-12">
                  <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">Important Notice</h3>
                    <p className="text-muted-foreground">
                      Please read this refund policy carefully before purchasing our services. By placing an order, you acknowledge that you have read, understood, and agree to this policy.
                    </p>
                  </div>
                </div>

                <div className="prose prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground prose-li:text-muted-foreground">
                  <h2>1. Overview</h2>
                  <p>
                    At TechCrafterIT, we strive to provide high-quality digital services that meet our clients' expectations. This refund policy outlines the conditions under which refunds may be granted.
                  </p>

                  <h2>2. Eligibility for Refunds</h2>
                  
                  {/* Eligible */}
                  <div className="not-prose my-8">
                    <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        <h3 className="font-display font-bold text-lg">Eligible for Refund</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <span>Project cancelled before work has begun (full refund)</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <span>Service not delivered as described in the agreement</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <span>Technical issues on our end that prevent service delivery</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <span>Duplicate payment (accidental double charge)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Not Eligible */}
                  <div className="not-prose my-8">
                    <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <XCircle className="w-6 h-6 text-red-500" />
                        <h3 className="font-display font-bold text-lg">Not Eligible for Refund</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                          <span>Change of mind after work has started</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                          <span>Completed and approved deliverables</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                          <span>Delays caused by client (late content, feedback, etc.)</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                          <span>Requests made after 30 days of delivery</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                          <span>Third-party services or licenses purchased on your behalf</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h2>3. Partial Refunds</h2>
                  <p>
                    If you cancel a project after work has begun, you may be eligible for a partial refund based on the work completed:
                  </p>
                  <ul>
                    <li>Less than 25% complete: 75% refund of total amount</li>
                    <li>25-50% complete: 50% refund of total amount</li>
                    <li>50-75% complete: 25% refund of total amount</li>
                    <li>More than 75% complete: No refund available</li>
                  </ul>

                  <h2>4. Refund Process</h2>
                  <p>To request a refund:</p>
                  <ol>
                    <li>Contact us at info@techcrafterit.com with your order details</li>
                    <li>Explain the reason for your refund request</li>
                    <li>Provide any relevant documentation or screenshots</li>
                    <li>We will review your request within 3-5 business days</li>
                    <li>If approved, refunds will be processed within 7-14 business days</li>
                  </ol>

                  <h2>5. Refund Method</h2>
                  <p>
                    Refunds will be issued to the original payment method used for the purchase. Processing times may vary depending on your payment provider.
                  </p>

                  <h2>6. Dispute Resolution</h2>
                  <p>
                    If you disagree with our refund decision, please contact us to discuss. We are committed to finding a fair resolution for both parties.
                  </p>

                  <h2>7. Chargebacks</h2>
                  <p>
                    We encourage you to contact us before initiating a chargeback with your payment provider. Chargebacks may result in account suspension and additional fees.
                  </p>

                  <h2>8. Contact Us</h2>
                  <p>
                    For refund requests or questions about this policy:
                  </p>
                  <ul>
                    <li>Email: info@techcrafterit.com</li>
                    <li>Phone: +880 1731-173992</li>
                    <li>Address: Hatibandha, Lalmonirhat, Rangpur, Bangladesh</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RefundPolicy;
