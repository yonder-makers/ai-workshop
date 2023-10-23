/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // Feel free to modify/remove this option
    
    // Indicate that these packages should not be bundled by webpack
    experimental: {
        serverComponentsExternalPackages: ['sharp', 'onnxruntime-node', 'canvas'],
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config
    }
}

module.exports = nextConfig
