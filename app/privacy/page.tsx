import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | CoreTechitect",
  description: "How CoreTechitect, LLC collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" lede="Last updated November 18, 2026">
      <h2>Information we collect</h2>
      <p>
        When you contact us, we collect your name, work email and any message you send. If you enable text alerts, we
        also collect your mobile phone number and a record of your consent.
      </p>
      <h2>How we use it</h2>
      <p>
        We use contact information to reply to you. We use your mobile number only to send the account notifications
        you agreed to receive.
      </p>
      <h2>Text messaging (SMS)</h2>
      <p>
        No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
        Text messaging originator opt-in data and consent will not be shared with any third parties.
      </p>
      <p>
        Message frequency varies. Message and data rates may apply. Reply STOP to opt out at any time or HELP for help.
      </p>
      <h2>Contact</h2>
      <p>
        CoreTechitect, LLC, 10612 Providence Road, Charlotte, NC 28277.{" "}
        <a href="mailto:support@coretechitect.com">support@coretechitect.com</a>
      </p>
    </LegalPage>
  );
}
