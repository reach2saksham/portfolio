// app/page.js

import Home from './components/Home';

export const metadata = {
  title: "Saksham Jain",
  description: "Hi, I am a student from IIT Roorkee. I'm selectively skilled in product design and management with strong focus on developing high quality & impactful digital experiences.",
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
    description: "Hi, I am a student from IIT Roorkee. I'm selectively skilled in product design and management with strong focus on developing high quality & impactful digital experiences.",
    url: "https://www.sakshamjain.in",
    siteName: "Saksham Jain Portfolio",
    images: [
      {
        url: "https://www.sakshamjain.in/images/3/1.avif",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return <Home />;
}
