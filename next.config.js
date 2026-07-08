/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "protre.fit",
          },
        ],
        destination: "https://promostreino.com.br/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.protre.fit",
          },
        ],
        destination: "https://promostreino.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
