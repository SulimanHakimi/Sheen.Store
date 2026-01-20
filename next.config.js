/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizePackageImports: ['next/font/google'],
    },
    // Increase timeout for external requests
    staticPageGenerationTimeout: 180,
    // Add HTTP agent configuration for better network handling
    httpAgentOptions: {
        keepAlive: true,
    },
};

module.exports = nextConfig;
