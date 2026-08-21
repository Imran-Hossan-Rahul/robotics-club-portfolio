import "./globals.css";

export const metadata = {
  title: "UAP Robotics Club",
  description: "University of Asia Pacific Robotics Club - Sponsorship Portfolio. Partner with us for the next Robo Expo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap CSS */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Orbitron:wght@500;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />

        {/* Swiper CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />

        {/* Fancybox CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css" />
      </head>
      <body className="dark-theme">
        {children}

        {/* Bootstrap JS */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" async></script>
        {/* GSAP */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" async></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" async></script>
        {/* Swiper JS */}
        <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js" async></script>
        {/* Fancybox JS */}
        <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js" async></script>
      </body>
    </html>
  );
}
