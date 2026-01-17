import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientLayout from './components/ClientLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// SEO Configuration
const siteUrl = "https://www.sakshamjain.in";
const siteName = "Saksham Jain";
const siteTitle = "Saksham Jain | Product Designer from IIT Roorkee";
const siteDescription = "Hi, I'm a selectively skilled product designer from IIT Roorkee with strong focus on developing high quality & impactful digital experiences.";
const siteImage = `${siteUrl}/images/3/1.avif`;
const twitterHandle = "@sakshamjainiitr";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  keywords: [
    "Saksham Jain",
    "Product Designer",
    "UX Designer",
    "UI Designer",
    "IIT Roorkee",
    "IITR",
    "Portfolio",
    "Design Portfolio",
    "Product Design",
    "User Experience",
    "User Interface",
    "Designer from IIT Roorkee",
    "Developer from IIT Roorkee",
    "Product Manager from IIT Roorkee",
    "Architecture",
    "IMG",
    "Information Management Group",
    "Engineer",
    "Architect",
    "IITian",
    "Next.js",
    "Web Design",
    "Digital Design",
    "Visual Design",
    "Interaction Design"
  ],
  authors: [{ name: "Saksham Jain", url: siteUrl }],
  creator: "Saksham Jain",
  publisher: "Saksham Jain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: "Saksham Jain - Product Designer Portfolio",
        type: "image/avif"
      },
      {
        url: `${siteUrl}/og-image.png`, // Fallback PNG image
        width: 1200,
        height: 630,
        alt: "Saksham Jain - Product Designer Portfolio",
        type: "image/png"
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: twitterHandle,
    site: twitterHandle,
    images: {
      url: siteImage,
      alt: "Saksham Jain - Product Designer Portfolio"
    }
  },
  
  // Canonical URL
  alternates: {
    canonical: siteUrl,
    types: {
      'application/rss+xml': `${siteUrl}/rss.xml`,
    }
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification (add your actual verification codes)
  verification: {
    google: 'your-google-verification-code', // Replace with actual code from Google Search Console
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  
  // Additional metadata
  category: 'technology',
  classification: 'Portfolio',
};

export default function RootLayout({ children }) {
  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Saksham Jain',
        url: siteUrl,
        image: {
          '@type': 'ImageObject',
          url: siteImage,
          width: 1200,
          height: 630
        },
        description: siteDescription,
        jobTitle: 'Product Designer',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Indian Institute of Technology Roorkee',
          sameAs: 'https://www.iitr.ac.in/'
        },
        sameAs: [
          // Add your actual social media profiles
          'https://www.linkedin.com/in/sakshamjainiitr',
          'https://twitter.com/sakshamjainiitr',
          'https://github.com/reach2saksham',
          'https://dribbble.com/reach2saksaksham',
          'https://behance.net/sakshamjainiitr'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        publisher: {
          '@id': `${siteUrl}/#person`
        },
        inLanguage: 'en-IN'
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: siteTitle,
        isPartOf: {
          '@id': `${siteUrl}/#website`
        },
        about: {
          '@id': `${siteUrl}/#person`
        },
        description: siteDescription,
        inLanguage: 'en-IN'
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: siteTitle,
        description: siteDescription,
        mainEntity: {
          '@id': `${siteUrl}/#person`
        }
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/SSRomanBody.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/WhyteRegular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manropemedium.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ppbook.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon - multiple sizes for different devices */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Saksham Jain" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        
        {/* Mobile Web App Capable */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Saksham Jain" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}