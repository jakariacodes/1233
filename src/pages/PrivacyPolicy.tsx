import { Link } from "@tanstack/react-router";
import { Shield, ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold">Privacy Policy</h1>
                <p className="text-muted-foreground">Last updated: August 20, 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto prose prose-invert prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-white/70 prose-li:text-white/70">
              <p>
                InfraTech is a web design agency providing proven digital services globally. Since the beginning of our journey, we have focused on dependable service and measurable client success.
              </p>
              
              <h2>InfraTech Privacy Policy</h2>
              <p>
                InfraTech is committed to protecting and respecting your privacy, including any personal information you may choose to provide us. This Privacy Policy, including Cookie Policy, describes how your personal information is collected, used, and shared when you visit or purchase from the InfraTech website (the "Site").
              </p>
              <p>
                Please read the following carefully to understand our views and practices regarding your personal information and how we will treat it.
              </p>

              <h2>PERSONAL INFORMATION WE COLLECT</h2>
              <p>
                When you visit the site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the installed cookies on your device.
              </p>
              <p>
                Additionally, as you browse the site, we collect information about the individual web pages or products you view, what websites or search terms referred you to the site, and how you interact with the site. We refer to this automatically-collected information as "Device Information."
              </p>
              <p>We collect Device Information using the following technologies:</p>
              <ul>
                <li>"Cookies" are data files that are placed on your device or computer and often include a unique anonymous identifier.</li>
                <li>"Log files" track actions occurring on the site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
                <li>"Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the site.</li>
                <li>"Google Analytics," "events" and "pixels" that records traffic-related information and how you interact with the site.</li>
              </ul>
              <p>
                Additionally, when you make a purchase or attempt to purchase through the site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers, PayPal e-mail, bank details), e-mail address, and phone number. We refer to this information as "Order Information."
              </p>
              <p>
                When we talk about "Personal Information" in this Privacy Policy, we are talking both about Device Information and Order Information.
              </p>

              <h2>HOW DO WE USE YOUR PERSONAL INFORMATION?</h2>
              <p>
                We use the Order Information that we generally collect to fulfill any orders placed through the site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
              </p>
              <ul>
                <li>Communicate with you;</li>
                <li>Screen our orders for potential risk or fraud; and</li>
                <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
              </ul>
              <p>
                We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally, to improve and optimize our site (for example, by generating analytics about how our customers browse and interact with the site).
              </p>

              <h2>SHARING YOUR PERSONAL INFORMATION</h2>
              <p>
                We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use WooCommerce to power our online store and Google Analytics to help us understand how our customers use the site.
              </p>
              <p>
                Finally, we may also share your Personal Information to comply with applicable laws and regulations, respond to a subpoena, search warrant, or other lawful requests for information we receive, or protect our rights otherwise.
              </p>

              <h2>YOUR RIGHTS</h2>
              <p>
                You have the right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
              </p>

              <h2>DATA RETENTION</h2>
              <p>
                When you place an order through the site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
              </p>

              <h2>CONTACT US</h2>
              <p>
                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@InfraGlobalTech.com.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;