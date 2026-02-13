import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zivel Privacy Policy",
  description:
    "Zivel Privacy Policy describing how we collect, use, share, and protect personal information, including cookies, analytics, and opt-out choices.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="section max-w-4xl space-y-12 py-24">
      <header className="space-y-3">
        <h1>Zivel® Privacy Policy</h1>
        <p className="text-sm text-white/60">Last Updated: {new Date().getFullYear()}</p>
      </header>

      <section className="space-y-4">
        <h2>Introduction</h2>
        <p>
          Welcome to Zivel ("Zivel", "Company", "we", "us", or "our"). Zivel respects your privacy and is committed
          to protecting it through this Privacy Policy ("Privacy Policy"). As used in this Privacy Policy, the
          foregoing references include Zivel Franchise, LLC and Pryme, LLC.
        </p>
        <p>
          This Privacy Policy describes the types of information we may collect from you or that you may provide when you:
          (i) use any Zivel website, mobile application(s), and other Zivel online services (collectively, "Technology Service")
          that link to or reference this Privacy Policy; (ii) use Zivel services as described in the Zivel Monthly Membership
          Agreement or other applicable written agreement or enrollment forms (the "Services"); and (iii) interact with our
          practices for collecting, using, maintaining, protecting, and disclosing that information.
        </p>
        <p>
          This Privacy Policy may change from time to time (see "Updates to Our Privacy Policy"). Your continued use of the
          Technology Service and/or Services after we make changes is deemed acceptance of those changes.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Information Collection Practices</h2>

        <h3>Collection and Use of Personal Information</h3>
        <p>
          When you use our Technology Service and/or Services, we may collect information that can be used to identify you
          ("Personal Information"). When you voluntarily submit Personal Information (e.g., account registration, forms,
          web chat, email, membership documents), you consent to collection, use, and disclosure of that information in
          accordance with this Privacy Policy.
        </p>
        <p>
          Personal Information may include (without limitation) your name, address, driver's license number, email address,
          telephone number, and other information you choose to provide.
        </p>
        <p>We may use Personal Information to:</p>
        <ul className="list-disc pl-6 text-white/70 space-y-2">
          <li>Provide the Technology Service and Services and related customer/technical support.</li>
          <li>Process enrollment, scheduling, and account administration.</li>
          <li>Communicate service-related information, security alerts, and operational updates.</li>
          <li>Perform analytics, troubleshoot, and improve the Technology Service and Services.</li>
          <li>Prevent fraud, detect security incidents, and enforce our terms and policies.</li>
          <li>Respond to questions and requests.</li>
          <li>Provide information about Zivel offerings, products, services, and events (subject to your choices below).</li>
          <li>Use de-identified and aggregated information for legally permissible purposes.</li>
          <li>Any other purpose described at the time you provide the information or with your consent.</li>
        </ul>

        <h3 className="pt-2">Collection and Use of Non-Personal Information</h3>
        <p>
          When you access our Technology Service, we may collect "Non-Personal Information" that does not identify you
          personally but provides usage data such as browser agent, IP address, device identifiers, operating system,
          access times, approximate location (where permitted by device settings), and interactions with our pages.
          This data helps us analyze and improve the user experience.
        </p>

        <h3 className="pt-2">How and When We Collect Information</h3>
        <p>
          We collect information directly when you provide it to us and automatically as you navigate through the Technology Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Cookies and Automatic Data Collection Technologies</h2>
        <p>
          As you navigate and interact with our Technology Service, we may use cookies and similar technologies (such as pixels,
          tags, and web beacons) to collect information about your equipment, browsing actions, and usage patterns.
        </p>

        <h3>Types of Cookies</h3>
        <ul className="list-disc pl-6 text-white/70 space-y-2">
          <li>
            <span className="text-white/85">Strictly Necessary Cookies</span> — required for the Technology Service to function (e.g., security, load balancing).
          </li>
          <li>
            <span className="text-white/85">Functional Cookies</span> — remember preferences and enhance features.
          </li>
          <li>
            <span className="text-white/85">Analytics Cookies</span> — help us understand how the site is used and improve performance.
          </li>
          <li>
            <span className="text-white/85">Advertising/Marketing Cookies</span> — may be used by us or partners to show relevant content (where applicable).
          </li>
        </ul>

        <h3>Third-Party Cookies and Analytics</h3>
        <p>
          Some content or features may be provided by third parties (including analytics providers). These parties may use cookies
          or similar technologies to collect information about you over time and across websites. We do not control third-party
          technologies, and their use is governed by their privacy policies.
        </p>

        <h3>Choices and Opt-Out for Cookies</h3>
        <p>
          You can control cookies through your browser settings. Most browsers allow you to:
          (i) block or delete cookies, (ii) limit certain cookie categories, and/or (iii) receive notifications when cookies are set.
          If you disable cookies, some parts of the Technology Service may not function properly.
        </p>

        <h3>Do Not Track</h3>
        <p>
          Some browsers include a "Do Not Track" feature. Because there is not a consistent industry standard for responding to
          these signals, our Technology Service may not respond to "Do Not Track" settings.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Sharing or Disclosure of Information</h2>
        <p>
          We do not sell your Personal Information. We disclose Personal Information to third parties only as reasonably necessary
          to carry out the permitted uses described in this Privacy Policy, including:
        </p>

        <ul className="list-disc pl-6 text-white/70 space-y-2">
          <li><span className="text-white/85">Affiliated Entities</span> — our subsidiaries and affiliates.</li>
          <li><span className="text-white/85">Franchises</span> — Zivel franchise-operated retail centers in connection with your membership and Services.</li>
          <li>
            <span className="text-white/85">Service Providers</span> — vendors that help us operate the Technology Service and Services (e.g., hosting, analytics, customer support),
            subject to contractual confidentiality and security obligations.
          </li>
          <li><span className="text-white/85">Successors</span> — in the event of a merger, sale, reorganization, or similar transaction.</li>
          <li><span className="text-white/85">Legal & Enforcement</span> — to comply with law, legal process, or protect rights, safety, and security.</li>
          <li><span className="text-white/85">With Your Consent</span> — where you request or explicitly authorize sharing.</li>
        </ul>

        <p>
          We may disclose Non-Personal Information and/or de-identified information without restriction.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Marketing Communications and Text Messaging</h2>
        <h3>Email</h3>
        <p>
          If you provide your email address, we may send operational messages related to your account, bookings, or membership.
          We may also send promotional communications. You can opt out of promotional emails by using the unsubscribe link in the email
          or by contacting us as described below. Even if you opt out of promotional messages, we may still send non-promotional
          communications (e.g., receipts, booking confirmations, account notices).
        </p>

        <h3>SMS/Text Messaging</h3>
        <p>
          If you provide your phone number, you may receive text messages from us. Messages may be sent using automated technology.
          Message and data rates may apply. Your consent to receive text messages is not a condition of purchase.
        </p>
        <p>
          You can opt out of marketing text messages at any time by following the instructions in the messages (for example, replying "STOP"),
          or by contacting us as described below. We do not share, sell, or trade our customers' phone numbers for direct marketing.
        </p>
      </section>

      <section className="space-y-4">
        <h2>State Resident Rights and Choices</h2>
        <p>
          Certain U.S. states provide residents with additional rights and choices regarding Personal Information. Where applicable,
          we will honor requests subject to legal limitations and verification requirements. Examples of rights that may apply include:
          access, correction, deletion, data portability, and opt-out of certain processing such as targeted advertising.
        </p>

        <h3>Residents of California</h3>
        <p className="text-white/70">
          California residents may have additional rights. We do not sell Personal Information. You may request details about the
          categories of Personal Information collected, the purposes for collection, categories of third parties with whom we share
          Personal Information, and request deletion of Personal Information (subject to legal exceptions). We will not discriminate
          against you for exercising applicable rights.
        </p>
      </section>

      <section className="space-y-4">
        <h2>International Considerations</h2>
        <p>
          Zivel is based in the United States. Information we collect may be stored and processed in the United States.
          If you access the Technology Service from outside the United States, you understand and consent to transfer of your
          information to the United States.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Children Under the Age of 13</h2>
        <p>
          Our Technology Services are not intended for children under 13. We do not knowingly collect Personal Information from
          children under 13. If we learn we collected such information without verified parental consent, we will delete it.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Data Security</h2>
        <p>
          We implement reasonable measures designed to secure Personal Information from accidental loss and unauthorized access,
          use, alteration, and disclosure. However, no internet transmission is completely secure, and we cannot guarantee security.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Updating Your Information and Deactivating Your Account</h2>
        <p>
          If you are a registered user, you may review, change, or correct certain information through the Technology Service
          (where available) or by contacting us. You may also request account deactivation by contacting us. We may require verification
          and may retain certain information as required by law or for legitimate business purposes.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Links to Third-Party Websites</h2>
        <p>
          The Technology Service may include links to third-party websites. This Privacy Policy applies only to information collected
          by Zivel. We are not responsible for third-party privacy practices; please review their policies before providing information.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Updates to Our Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post updates on this page and may provide additional notice
          where required. Your continued use of the Technology Service after changes indicates acceptance of the updated policy.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Contact Us</h2>
        <p>If you have questions or requests related to this Privacy Policy, contact:</p>
        <div className="rounded-2xl border-subtle bg-card p-6 text-white/80 space-y-1">
          <div>Zivel Franchise, LLC</div>
          <div>Attn: Privacy Officer</div>
          <div>
            Email:{" "}
            <a className="text-gold underline" href="mailto:contact@zivel.com">
              contact@zivel.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
