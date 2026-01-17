// app/sitemap.js
// This file generates a dynamic sitemap for your Next.js app

export default function sitemap() {
  const baseUrl = 'https://www.sakshamjain.in';
  
  // Static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Add more static routes as needed
  ];

  // If you have dynamic routes (e.g., individual project pages), add them here
  // Example:
  // const projects = await getAllProjects(); // Your data fetching function
  // const projectUrls = projects.map((project) => ({
  //   url: `${baseUrl}/projects/${project.slug}`,
  //   lastModified: new Date(project.updatedAt),
  //   changeFrequency: 'monthly',
  //   priority: 0.7,
  // }));

  return [
    ...routes,
    // ...projectUrls,
  ];
}