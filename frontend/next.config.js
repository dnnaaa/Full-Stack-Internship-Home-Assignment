const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, './src');
    config.resolve.alias['@components'] = path.join(
      __dirname,
      './src/components'
    );
    config.resolve.alias['@app'] = path.join(__dirname, './src/app');
    config.resolve.alias['@services'] = path.join(__dirname, './src/services');
    config.resolve.alias['@style'] = path.join(__dirname, './src/style');

    return config;
  },
  reactStrictMode: false,
};
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
};
