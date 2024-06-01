/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/v0/b/**',
            },
            {
                protocol: 'https',
                hostname: "dufkorayqhkwairjodcm.supabase.co",
                port: '',
                pathname: '/storage/v1/object/public/stuterlink/**'
            }
        ],
    },
};

export default nextConfig;
