import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Core Techitect",
  description: "Terms of service for coretechitect.com and CoreTechitect text message notifications.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service" lede="Last updated November 23, 2026">
      <p>
        These terms apply to your use of coretechitect.com (the “Site”), operated by CoreTechitect, LLC
        (“CoreTechitect,” “we,” “us”). By using the Site you agree to them. If you do not agree, please do not use the
        Site.
      </p>

      <h2>Using this site</h2>
      <p>
        This site describes the services of CoreTechitect, LLC and lets you contact us. It is not an offer to provide
        services on any particular terms. Content is provided as is, without warranties of any kind.
      </p>

      <h2>Consulting engagements are governed separately</h2>
      <p>
        Any consulting work we perform for you is governed by a written agreement or statement of work signed by both
        parties. If these terms conflict with that agreement, the signed agreement controls. Contacting us through the
        Site, or a conversation or audit offered through it, does not by itself create a client relationship or any
        obligation on either side to proceed.
      </p>

      <h2>Information only, no advice</h2>
      <p>
        Content on the Site is provided for general information. Descriptions of our approach, timelines, and outcomes
        are illustrative, and results vary with each organization&apos;s systems, data, and people. Nothing on the
        Site is legal, financial, tax, or compliance advice.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the Site in violation of any law or the rights of others;</li>
        <li>
          attempt to gain unauthorized access to the Site, its hosting, or connected systems, or probe or test their
          security without our written permission;
        </li>
        <li>interfere with or overload the Site, including with automated or abusive traffic;</li>
        <li>
          submit false, misleading, or malicious content through the contact form, or use the form to send spam or
          unsolicited promotions.
        </li>
      </ul>

      <h2>Submissions</h2>
      <p>
        Information you send through the contact form or by email is handled as described in our{" "}
        <a href="/privacy">Privacy Policy</a>. Please do not send confidential, regulated, or sensitive data, such as
        credentials, health or payment data, or client-owned datasets, before we have a signed agreement that covers
        it. Unless we agree otherwise in writing, what you send is not treated as confidential and does not create any
        duty on our part to keep it secret.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Site, including its text, design, graphics, and the Core Techitect name and logo, is owned by CoreTechitect
        or its licensors and protected by intellectual property laws. You may view and share links to the Site for
        personal or internal business evaluation. You may not copy, modify, distribute, or create derivative works from
        it, or use our name or logo, without our written permission.
      </p>

      <h2>Third-party links</h2>
      <p>
        The Site may link to websites we do not control. We are not responsible for their content or practices, and a
        link is not an endorsement.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The Site is provided “as is” and “as available,” without warranties of any kind, express or implied, including
        warranties of accuracy, merchantability, fitness for a particular purpose, and non-infringement. We do not
        warrant that the Site will be uninterrupted, error-free, or free of harmful components.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, CoreTechitect and its members, employees, and contractors are not liable
        for any indirect, incidental, special, consequential, or punitive damages, or for lost profits, revenue, or
        data, arising from your use of or inability to use the Site. Our total liability for any claim relating to the
        Site is limited to one hundred U.S. dollars ($100). Nothing in these terms limits liability that cannot be
        limited by law.
      </p>

      <h2>Text message terms</h2>
      <p>
        <strong>Program:</strong> CoreTechitect account notifications. Recurring automated texts, such as system alerts
        and task reminders, sent to numbers whose owner has opted in.
      </p>
      <p>
        <strong>Opt in:</strong> You opt in by entering your mobile number and checking the consent box on the
        CoreTechitect text alerts page. This program is limited to the business owner, and only the owner&apos;s number
        can be enrolled. Consent is not a condition of purchase.
      </p>
      <p>
        <strong>Frequency and cost:</strong> Message frequency varies. Message and data rates may apply.
      </p>
      <p>
        <strong>Opt out and help:</strong> Reply STOP, END, CANCEL, UNSUBSCRIBE or QUIT to opt out. Reply HELP or INFO
        for help, or email <a href="mailto:support@coretechitect.com">support@coretechitect.com</a>.
      </p>
      <p>
        <strong>Carriers:</strong> Carriers are not liable for delayed or undelivered messages.
      </p>
      <p>
        <strong>Privacy:</strong> See our <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of North Carolina, without regard to conflict-of-laws rules.
        Any dispute relating to the Site will be brought in the state or federal courts located in North Carolina, and
        you consent to their jurisdiction.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The date at the top shows the latest version, and continuing to
        use the Site after a change means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href="mailto:contact@coretechitect.com">contact@coretechitect.com</a>.
      </p>
    </LegalPage>
  );
}
