import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | CoreTechitect",
  description: "Terms of service for coretechitect.com and CoreTechitect text message notifications.",
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service" lede="Last updated November 18, 2026">
      <h2>Using this site</h2>
      <p>
        This site describes the services of CoreTechitect, LLC. Content is provided as is, without warranties of any
        kind.
      </p>
      <h2>Text message terms</h2>
      <p>
        <strong>Program:</strong> CoreTechitect account notifications. Recurring automated texts, such as system alerts
        and task reminders, sent to numbers whose owner has opted in.
      </p>
      <p>
        <strong>Opt in:</strong> You opt in by entering your mobile number and checking the consent box on the CoreTechitect
        text alerts page. This program is limited to the business owner, and only the owner&apos;s number can be enrolled.
        Consent is not a condition of purchase.
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
    </LegalPage>
  );
}
