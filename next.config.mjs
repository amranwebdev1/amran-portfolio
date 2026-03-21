/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bbsfxrglpfejbxvljkxh.supabase.co', // আপনার সুপাবেস হোস্টনাম
        port: '',
        pathname: '/storage/v1/object/public/**', // সব পাবলিক ইমেজের জন্য
      },
    ],
  },
};

export default nextConfig;
