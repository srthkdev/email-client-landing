# Venn - Modern Email Client

Venn is a modern, privacy-focused email client that brings a fresh perspective to email management. Built with React, Next.js, and Tailwind CSS, it offers a clean and intuitive interface while prioritizing user privacy and customization.

## Features

- **Gmail Integration**: Seamlessly connect your Gmail account and manage your emails
- **Modern UI**: Clean, responsive interface with customizable themes
- **Theme Options**:
  - System (follows your system preference)
  - Light Mode
  - Dark Mode
  - Special themes:
    - Midnight (dark blue theme)
    - Forest (dark green theme)
    - Autumn (warm light theme)

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Gmail
- **UI Components**: Radix UI primitives with shadcn/ui
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/venn.git
   cd venn
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then fill in your:
   - Google OAuth credentials
   - Gmail API keys
   - Other required environment variables

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with the following variables:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this code for your own projects!
