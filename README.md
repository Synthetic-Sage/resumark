# Resumark

Resumark is a professional, production-ready, pure client-side resume-building SaaS application. It allows you to build stunning, ATS-friendly resumes entirely in your browser with absolute privacy.

## Features
- **100% Client-Side:** Built with React + Vite. No backend. No user data ever leaves the browser.
- **Auto-Save:** Uses `localStorage` to instantly persist your data.
- **Multiple Templates:** 5 unique templates including ATS-optimized options.
- **Export Formats:** Pixel-perfect PDF generation (via `react-to-print`) and fully editable DOCX generation (via `docx`).
- **Free Hosting:** Ready to be hosted on GitHub Pages for $0/month.

## Local Development

If you have Node.js installed:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment to GitHub Pages

This repository includes a GitHub Action workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the app to GitHub Pages whenever you push to the `main` branch.

To enable it:
1. Push this code to a public GitHub repository.
2. In your repository, go to **Settings > Pages**.
3. Under **Build and deployment**, set the **Source** to **GitHub Actions**.
4. The workflow will run automatically on your next push, or you can trigger it manually from the Actions tab.

> **Note:** Make sure to update the `base` property in `vite.config.ts` to match your repository name (e.g. `/resumark/`).
