export default function robots() {
  const baseUrl = "https://bajarly.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/seller/", "/api/"], // এই ড্যাশবোর্ড ও এপিআইগুলো এসইও ইনডেক্স হবে না
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
