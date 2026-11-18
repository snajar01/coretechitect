import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { SmsOptInForm } from "@/components/SmsOptInForm";

export const metadata: Metadata = {
  title: "Text alerts | CoreTechitect",
  description: "How CoreTechitect sends account notifications by text message, and how to opt in or out.",
};

export default function SmsPage() {
  return (
    <LegalPage
      eyebrow="Text alerts"
      title="CoreTechitect account notifications by text"
      lede="CoreTechitect, LLC sends automated account notifications, such as system alerts and task reminders, by text message to the business owner. This program is not used for marketing."
    >
      <SmsOptInForm />
      <h2>How it works</h2>
      <ul>
        <li>You enter your mobile number and check the consent box above. Nothing is sent until you do.</li>
        <li>We send one confirmation text. Then you receive account notifications about once a week.</li>
        <li>
          Reply STOP at any time to opt out. Reply HELP for help, or email{" "}
          <a href="mailto:support@coretechitect.com">support@coretechitect.com</a>.
        </li>
      </ul>
      <div className="callout">
        <p>
          No mobile information will be shared with third parties or affiliates for marketing or promotional
          purposes. See our <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </LegalPage>
  );
}
