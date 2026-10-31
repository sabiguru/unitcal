# CalcFort

A free, open-source online calculator platform providing 200+ specialized calculators across multiple categories. Built with modern web technologies for optimal performance and user experience.

> **Note:** This project was previously developed under the internal codename "unitcal" but is publicly known as **CalcFort**. You may see references to both names in the codebase.

## Features

- **200+ Calculators** organized across 12+ categories:
  - Mathematics & Basic Tools (scientific, graphing, equations)
  - Finance & Investment (mortgage, loans, retirement planning)
  - Health & Fitness (BMI, calories, workout tracking)
  - Engineering & Technology (electrical, subnet, password generator)
  - Construction & DIY (area, volume, material calculators)
  - Cooking & Food (baking conversions, recipe scaling)
  - And many more specialized calculators

- **User Authentication System**
  - Email/password registration with verification
  - Personalized calculator history
  - Favorite calculators management
  - Privacy-focused design with local calculations

- **Educational Content**
  - 145+ MDX-based blog posts
  - Step-by-step explanations for each calculator
  - Related calculator suggestions
  - Expert reviews and trust signals

- **SEO Optimized**
  - Structured data with Schema.org markup
  - Dynamic meta tags per calculator
  - Comprehensive breadcrumb navigation
  - Automated sitemap generation

## Technology Stack

### Frontend
- **Next.js 15.3.8** - React framework with App Router
- **React 18.3.1** - UI library
- **Tailwind CSS 4** - Utility-first styling
- **Next MDX Remote** - Dynamic MDX content rendering
- **Decimal.js** - Precise mathematical calculations

### Backend
- **Prisma 6.11.1** - Type-safe ORM
- **PostgreSQL** - Primary database
- **NextAuth v4** - Authentication solution
- **Nodemailer** - Email delivery
- **Express** - Custom production server

### Performance
- **Vercel Speed Insights** - Real-time analytics
- **Express Static Gzip** - Compression middleware
- **Custom precompression** - Build-time optimization

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- PostgreSQL database
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sabiguru/unitcal.git
cd unitcal
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

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Then edit `.env` with your actual values. See `.env.example` for all required variables.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (custom Express server)
- `npm run start:next` - Start production server (Next.js built-in)
- `npm run lint` - Run ESLint

## Project Structure

```
/src
├── /app                    # Next.js pages and routes
│   ├── /calculator        # Dynamic calculator pages
│   ├── /learn             # Educational content
│   ├── /auth              # Authentication pages
│   ├── /account           # User dashboard
│   └── /api               # API routes
├── /components
│   ├── /calc              # Calculator components (200+)
│   ├── /blog              # Blog/content components
│   └── /ads               # Advertising components
├── /data
│   ├── calculators.ts     # Calculator registry
│   ├── categoryData.ts    # Category definitions
│   └── seoBySlug.ts       # SEO metadata
├── /content/calculators   # MDX blog content (145+ files)
├── /lib                   # Utility functions
├── /config                # Configuration files
└── /types                 # TypeScript definitions

/prisma
└── schema.prisma          # Database schema

/public                    # Static assets
```

## Database Schema

The application uses Prisma with PostgreSQL and includes the following main models:

- **User** - User accounts with preferences
- **Account** - OAuth provider accounts
- **Session** - User sessions
- **Calculation** - User calculation history
- **FavoriteCalculators** - User's saved calculators
- **VerificationCode/Token** - Email verification

### Data Privacy Note

**This repository contains NO real user data.** The database schema supports user accounts, calculation history, and email verification, but:
- No production database is included in this repository
- The `dev.db` file has been removed from git history
- All user-facing features use fictional test data only for development
- Production deployments use separate, secure databases not included in this codebase

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Add tests for new features when applicable
- Update documentation as needed
- Ensure all calculators are thoroughly tested for accuracy

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Sabiguru**

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Database powered by [Prisma](https://prisma.io)
- Authentication by [NextAuth.js](https://next-auth.js.org)

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

## Deployment

### Vercel (Recommended)

The easiest way to deploy CalcFort is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

The `vercel-build` script handles database migrations automatically.

### Self-Hosting

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

The custom Express server includes gzip compression and optimized static file serving.

## Performance

- Precompressed static assets (gzip/brotli)
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Database connection pooling
- Edge-ready with Vercel deployment

## Privacy & Security

- All calculations are performed locally in the browser when possible
- User passwords are hashed with bcryptjs
- Email verification for new accounts
- Secure session management with NextAuth
- HTTPS enforced in production

---

Made with ❤️ by Sabiguru
