module.exports = {
  images: {
    // unable to wildcard subdomain. May have to switch to regular <img /> component.
    domains: [
      'lh3.googleusercontent.com',
      'productify-bucket.s3.ca-central-1.amazonaws.com',
    ],
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
