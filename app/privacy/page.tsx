import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Core Techitect",
  description: "How CoreTechitect, LLC collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" lede="Last updated November 23, 2026">
      <p>
        CoreTechitect, LLC (“CoreTechitect,” “we,” “us”) runs coretechitect.com to describe our data architecture,
        analytics, and applied AI consulting and to hear from prospective clients. This policy explains what
        information the site collects and what we do with it.
      </p>

      <h2>Information we collect</h2>
      <p>We collect only what you choose to send us, plus the technical data any website receives.</p>
      <ul>
        <li>Contact form submissions: your name, work email address, and the optional message you write.</li>
        <li>Email you send to contact@coretechitect.com, including anything you put in it.</li>
        <li>
          If you enable text alerts, your mobile phone number and a record of your consent (see Text messaging below).
        </li>
        <li>
          Standard technical data our hosting infrastructure records for every request, such as IP address, browser
          type, device, pages requested, and timestamps.
        </li>
      </ul>
      <p>
        The site does not require an account, does not sell anything, and does not ask for payment information. We do
        not intentionally collect sensitive personal information, and we ask that you not include it in the contact
        form.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your inquiry and schedule a conversation about your data estate.</li>
        <li>To send the account notifications you agreed to receive by text, using your mobile number only for that.</li>
        <li>To operate, secure, and troubleshoot the site, including detecting abuse and spam.</li>
        <li>
          To keep a record of business correspondence and, where you become a client, to prepare and deliver the
          engagement.
        </li>
        <li>To meet legal, tax, and contractual obligations.</li>
      </ul>
      <p>We do not sell your information and we do not use it for advertising.</p>

      <h2>Text messaging (SMS)</h2>
      <p>
        No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
        Text messaging originator opt-in data and consent will not be shared with any third parties.
      </p>
      <p>
        Message frequency varies. Message and data rates may apply. Reply STOP to opt out at any time or HELP for help.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        The site does not currently set advertising or tracking cookies and does not use third-party analytics. If that
        changes, we will update this policy before the change takes effect.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We share information only with service providers that help us run the site and our business, and only as needed
        for that purpose. These include our website hosting provider, our email and productivity providers, and any
        email delivery service used to route contact form submissions to our inbox. They may process your information
        on our behalf and are not permitted to use it for their own purposes. Mobile numbers and text-message consent
        records are handled as described under Text messaging above.
      </p>
      <p>
        We may also disclose information when required by law, to enforce our agreements, or to protect the rights and
        safety of CoreTechitect, our clients, or others, and in connection with a merger, financing, or sale of the
        business.
      </p>

      <h2>Retention</h2>
      <p>
        We keep contact form submissions and related correspondence for as long as needed to respond to you and
        maintain a record of our business relationship, and then delete or anonymize them. Server logs are kept by our
        hosting provider for a limited period. If you become a client, the data we handle for you is governed by the
        engagement agreement, not this policy.
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS and we limit access to submissions to the people who need them. No method of
        transmission or storage is perfectly secure, so we cannot guarantee absolute security.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can ask us at any time to tell you what personal information we hold about you, to correct it, or to delete
        it. Depending on where you live, you may have additional rights under laws such as the GDPR, UK GDPR, or the
        California Consumer Privacy Act, including the right to object to or restrict certain processing and to lodge a
        complaint with your local data protection authority. To make a request, email the address below. We will
        respond within the time required by applicable law.
      </p>

      <h2>Children</h2>
      <p>The site is intended for business audiences and is not directed to children under 16.</p>

      <h2>International visitors</h2>
      <p>
        CoreTechitect is based in the United States, and information you submit may be processed there and in other
        countries where our service providers operate.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top shows when it last changed, and material
        changes will be reflected on this page.
      </p>

      <h2>Contact</h2>
      <p>
        CoreTechitect, LLC, 10612 Providence Road, Charlotte, NC 28277. Questions or requests about this policy:{" "}
        <a href="mailto:contact@coretechitect.com">contact@coretechitect.com</a> or{" "}
        <a href="mailto:support@coretechitect.com">support@coretechitect.com</a>.
      </p>
    </LegalPage>
  );
}
