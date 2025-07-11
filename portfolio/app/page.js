// app/page.js

import Home from './components/Home';

export const metadata = {
  title: "Saksham Jain",
  description: "Hi, I'm a selectively skilled product designer from IIT Roorkee with strong focus on developing high quality & impactful digital experiences.",
  keywords: [
    "Saksham", "Jain", "Saksham Jain", "IIT", "Roorkee", "IITR", "IIT Roorkee",
    "Design", "graphics", "visuals", "designer from IIT Roorkee",
    "developer from IIT Roorkee", "product manager from IIT Roorkee",
    "Architecture", "IMG", "Information Management Group", "Engineer",
    "Architect", "student", "IITian", "portfolio", "developer", "designer",
    "Next.js", "projects"
  ],
  openGraph: {
    title: "Saksham Jain",
    description: "Hi, I'm a selectively skilled product designer from IIT Roorkee with strong focus on developing high quality & impactful digital experiences.",
    url: "https://www.sakshamjain.in",
    siteName: "Saksham Jain Portfolio",
    images: [
      {
        src: "https://www.sakshamjain.in/images/3/1.avif",
        width: 1200,
        height: 630,
        alt: "Saksham Jain Portfolio Cover"
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saksham Jain",
    description: "Hi, I'm a selectively skilled product designer from IIT Roorkee with strong focus on developing high quality & impactful digital experiences.",
    images: ["https://www.sakshamjain.in/images/3/1.avif"]
  },
  alternates: {
    canonical: "https://www.sakshamjain.in"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function Page() {
  return <Home />;
}
