export default function sitemap() {
  const baseUrl = 'https://amran-portfolio.vercel.app';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/project`, lastModified: new Date() },
    { url: `${baseUrl}/skill`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];
}
