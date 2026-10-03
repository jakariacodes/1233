import { Link } from "@tanstack/react-router";
import { RefreshCw, ArrowLeft, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
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
                <h1 className="font-display text-3xl md:text-4xl font-bold">Payment & Refund Policy</h1>
                <p className="text-muted-foreground">Last updated: August 20, 2026</p>
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
                  <h3 className="font-display font-bold text-lg mb-2 text-white">Important Notice</h3>
                  <p className="text-white/70">
                    Please read this payment and refund policy carefully. By placing an order with InfraTech, you acknowledge that you have read, understood, and agree to this policy.
                  </p>
                </div>
              </div>

              <div className="prose prose-invert prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-white/70 prose-li:text-white/70">
                <h2>1. Overview</h2>
                <p>
                  At InfraTech, we strive to provide high-quality digital services. We plan each project by dividing work into milestones to ensure mutual understanding and eliminate potential disputes.
                </p>

                <h2>2. Payment Policy</h2>
                <p>
                  All projects begin with a complete discovery/analysis and the creation of a scope of work document. Payment terms, including deposit amounts and milestone payments, will be outlined in your specific agreement.
                </p>

                <h2>3. Refund Eligibility</h2>
                <p>
                  As time is spent to achieve every milestone and complete every module, a refund is not possible for work already completed.
                </p>
                <ul>
                  <li>No payment will be refunded once the client approves mock-up designs and we move into the development phase.</li>
                  <li>There are no partial refunds for projects mid-way through a milestone phase.</li>
                  <li>Digital marketing & SEO packages are not refundable, but may be cancelled with 7-10 days notice.</li>
                  <li>Special promotional offers are non-cancellable and non-refundable.</li>
                </ul>

                <h2>4. Liability and Maintenance</h2>
                <p>
                  After project completion, the full liability for maintaining the service lies with the client. Any actions taken by the client or their agents that harm the service are the client's sole responsibility.
                </p>

                <h2>5. Mutual Termination</h2>
                <p>
                  In the event of a project terminated on a mutual basis, the client retains control of all completed work paid for, and any payment for further development becomes void. Previous payments or deposits are non-refundable.
                </p>

                <h2>6. Refund Process</h2>
                <p>
                  If a refund is mutually agreed upon, it typically takes 7 to 10 working days to process. All processing fees and costs of services already rendered will be considered during the refund calculation.
                </p>

                <h2>7. Contact Information</h2>
                <p>
                  For any questions regarding our Payment & Refund Policy, please contact us at info@InfraGlobalTech.com.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RefundPolicy;