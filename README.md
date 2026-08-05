This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Agentic HQ (`/boardroom`)

CoreTechitect runs as an agentic business: every department (Finance, Sales,
Delivery, Engineering, Marketing, People, and the CEO's office) is owned by an
AI executive you can talk to.

- **Voice in / voice out** — click the mic to speak (Web Speech API, works in
  Chrome/Edge), and replies are read aloud in each executive's own voice.
- **All-hands standup** — one click makes every exec report their numbers,
  priorities, and risks in sequence, out loud.
- **Powered by Claude** — set `ANTHROPIC_API_KEY` in your environment and the
  executives answer free-form via the Anthropic API (`claude-opus-5`). Without
  a key they fall back to a built-in simulation over the same business data,
  so the demo always works.

The org model, department KPIs, and persona voices live in `lib/company.ts`;
the API route is `app/api/agent/route.ts`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
