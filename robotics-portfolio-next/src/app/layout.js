import { Space_Grotesk, Inter, Orbitron } from 'next/font/google';
import "./globals.css";

// Fonts loaded via next/font — self-hosted, non-blocking, optimized
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata = {
  title: "UAP Robotics Club",
  description: "University of Asia Pacific Robotics Club - Sponsorship Portfolio. Partner with us for the next Robo Expo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${orbitron.variable}`}>
      <head />
      <body className="dark-theme">
        {children}
      </body>
    </html>
  );
}
