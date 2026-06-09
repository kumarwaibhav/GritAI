/** @type {import("next").NextConfig} */
const nextConfig = {
  serverExternalPackages: ["node-pptx-parser", "unzipper"],
  turbopack: {},
  async headers() {
    return [
      {
        // Security headers on everything
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
      {
        // Cache public images / icons for 7 days
        source: "/(.*)\.(png|jpg|jpeg|webp|svg|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
