// next.config.js
const withImages = require('next-images');
const Dotenv = require("dotenv-webpack");

module.exports = withImages({
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Add the new plugin to the existing webpack plugins
        config.plugins.push(new Dotenv({ silent: true }));
        return config;
    },
    experimental: { optionalCatchAll: true }
});




