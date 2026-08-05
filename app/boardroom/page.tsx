import type { Metadata } from "next";

import { Boardroom } from "@/components/boardroom/Boardroom";

export const metadata: Metadata = {
  title: "Agentic HQ — CoreTechitect boardroom",
  description:
    "CoreTechitect run as an agentic business: every department is owned by an AI executive you can talk to by voice — status reports, priorities, and risks on demand.",
  robots: { index: false },
};

export default function BoardroomPage() {
  return <Boardroom />;
}
