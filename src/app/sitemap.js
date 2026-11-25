import { supabase } from "@/lib/supabase"; // আপনার সুপাবেস ক্লায়েন্ট পাথ

export default async function sitemap() {
  const baseUrl = "https://bajarly.com";

  // ১. সব ডাইনামিক প্রোডাক্ট লিংক ফেচ
  const { data: products } = await supabase
    .from("products")
    .select("slug, updated_at");

  const productUrls = (products || []).map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updated_at || Date.now()),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // ২. সব ডাইনামিক শপ/সেলার লিংক ফেচ
  const { data: shops } = await supabase
    .from("shops")
    .select("username, slug, updated_at");

  const shopUrls = (shops || []).map((shop) => ({
    url: `${baseUrl}/shops/${shop.username}/${shop.slug}`,
    lastModified: new Date(shop.updated_at || Date.now()),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // ৩. মূল স্ট্যাটিক পেজসমূহ
  const staticUrls = [
    "",
    "/shops",
    "/search",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  }));

  return [...staticUrls, ...shopUrls, ...productUrls];
}
