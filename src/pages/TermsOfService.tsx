import { Link } from "@tanstack/react-router";
import { FileText, ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold">Terms & Condition</h1>
                <p className="text-muted-foreground">Last updated: August 20, 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto prose prose-invert prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-white/70 prose-li:text-white/70">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By engaging with or using the services provided by InfraTech, clients agree to be bound by the terms and conditions outlined herein.
              </p>

              <h2>2. Scope of Work</h2>
              <p>
                InfraTech will provide web design and development services as agreed upon with the client. The scope of work, deliverables, and project timeline will be defined in a separate agreement or proposal.
              </p>

              <h2>3. Client Responsibilities</h2>
              <p>
                The client is responsible for providing all necessary materials, content, and approvals required for the project. Timely and clear communication is essential to ensure project progress and completion.
              </p>

              <h2>4. Intellectual Property</h2>
              <p>
                All intellectual property rights, including copyrights, trademarks, and any original design elements created by the company, shall remain our property unless otherwise specified. The client is granted a non-exclusive license to use the finalized website design for its intended purpose.
              </p>

              <h2>5. Website Content</h2>
              <p>
                The client is solely responsible for the accuracy, legality, and appropriateness of all content provided. The client must ensure that the content does not infringe upon any intellectual property rights or violate any laws.
              </p>

              <h2>6. Payment and Fees</h2>
              <p>
                The client agrees to pay the agreed-upon fees for the services provided. Payment terms, including deposit amounts, milestone payments, and the final payment, will be outlined in the agreement or proposal. Late payments may incur additional charges or project delays.
              </p>

              <h2>7. Revisions and Change Requests</h2>
              <p>
                The client may request revisions during the project's development stage, subject to the scope of work and agreed-upon number of revisions. Additional revisions or significant scope changes may require an adjustment to the project timeline and fees.
              </p>

              <h2>8. Website Maintenance and Updates</h2>
              <p>
                Unless otherwise agreed upon, ongoing website maintenance and updates are not included in the initial project. We may offer maintenance services separately, and fees and terms will be discussed and agreed upon.
              </p>

              <h2>9. Confidentiality</h2>
              <p>
                InfraTech will keep all client information and project details confidential unless required by law or with the client's explicit consent.
              </p>

              <h2>10. Termination</h2>
              <p>
                Either party may terminate the project or contract in writing if there is a material breach of the agreement. In such cases, the client may be responsible for payment for services rendered up to the termination date.
              </p>

              <h2>11. Limitation of Liability</h2>
              <p>
                InfraTech shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising from the use or inability to use the website or any related services.
              </p>

              <h2>12. Governing Law and Jurisdiction</h2>
              <p>
                These terms and conditions shall be governed by and construed in accordance with the laws of the jurisdiction where the company is located.
              </p>

              <h2>13. Amendments</h2>
              <p>
                We may update or modify these terms and conditions from time to time. Clients will be notified of any material changes, and continued engagement constitutes acceptance of the revised terms.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TermsOfService;