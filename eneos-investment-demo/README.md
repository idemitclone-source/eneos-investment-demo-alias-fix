# ENEOS Portfolio Platform — Demo Frontend

A responsive React + TypeScript + Vite frontend prototype based on the five-destination flow in the supplied Idemitsu reference PDF:
- Home
- VIP / Portfolio tiers
- Tasks
- Team
- Me / Account

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

To create a production build:

```bash
npm run build
npm run preview
```

## Design system

This project follows the shadcn/ui source-code approach:
- `components.json` configured for shadcn/ui
- Tailwind CSS v4 and CSS-variable theme tokens
- Reusable Button, Card, Badge and Dialog primitives in `src/components/ui`
- Radix UI Dialog and Slot primitives
- Lucide icons
- `cn` utility built with `clsx` and `tailwind-merge` in `src/lib/utils.ts`

The UI components are local source code and can be customized in this project.

## Included interactions

- Five-section navigation with responsive mobile bottom navigation
- Portfolio tier detail dialog
- Activity tabs and completion state
- Referral code copy interaction
- Demo funding and withdrawal preview dialogs
- Editable local demo profile
- Toast feedback for actions

## Important prototype boundary

This is a non-operational, independently developed demo concept. It is not an official ENEOS service and does not represent an ENEOS investment product, endorsement, authorization or offer. All balances, tiers, transaction records, community figures and interface copy are illustrative. There is no payment processor, wallet, authentication, backend, real referral system or investment functionality connected.

Before public release, replace the ENEOS identity with an authorized brand asset set or obtain written permission to use the company's trademarks and identity. Any real investment product, rates, returns, fees, eligibility, deposits, withdrawals and referral terms require verified documentation and appropriate legal/regulatory review.
