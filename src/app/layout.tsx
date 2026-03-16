import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "República Quintal – UNICAMP Limeira | Mais que uma república, uma família.",
    template: "%s | República Quintal UNICAMP Limeira",
  },
  description:
    "A República Quintal é a melhor república estudantil da UNICAMP Limeira. Moradia com qualidade, amizades para a vida toda, networking profissional e uma comunidade vibrante de estudantes.",
  keywords: [
    "República Quintal",
    "república estudantil",
    "UNICAMP Limeira",
    "moradia estudantil",
    "república Limeira",
    "FCA UNICAMP",
    "república universitária",
    "morar em Limeira",
    "república FCA",
    "estudantes UNICAMP",
  ],
  authors: [{ name: "República Quintal", url: "https://republicaquintal.com.br" }],
  creator: "República Quintal",
  publisher: "República Quintal",
  metadataBase: new URL("https://republicaquintal.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://republicaquintal.com.br",
    siteName: "República Quintal",
    title: "República Quintal – UNICAMP Limeira | Mais que uma república, uma família.",
    description:
      "A República Quintal é a melhor república estudantil da UNICAMP Limeira. Networking, amizades e qualidade de vida para estudantes da FCA UNICAMP.",
    images: [
      {
        url: "https://picsum.photos/seed/quintal-og/1200/630",
        width: 1200,
        height: 630,
        alt: "República Quintal UNICAMP Limeira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "República Quintal – UNICAMP Limeira",
    description: "Mais que uma república, uma família. Venha fazer parte da Quintal!",
    images: ["https://picsum.photos/seed/quintal-og/1200/630"],
    creator: "@republicaquintal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "República Quintal",
              description: "República estudantil da UNICAMP Limeira",
              url: "https://republicaquintal.com.br",
              logo: "https://picsum.photos/seed/quintal-logo/200/200",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Limeira",
                addressRegion: "SP",
                addressCountry: "BR",
              },
              sameAs: [
                "https://instagram.com/republicaquintal",
                "https://wa.me/5519999999999",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
